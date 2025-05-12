import { priceListStateSellingToOrg } from "$lib/shared.svelte";

export class Product {
    id: string = $state("");
    name: string = $state("");
    organiserProfitMargin: number = $state(0);
    participantProfitMargin: number = $state(0);
    soldToOrgN: number = $state(0);
    soldToPartN: number = $state(0);
    purchasedN: number = $state(0);
    purchasePriceM: number = $state(0);
    code: string = $state("");
    takenOutN: number = $state(0);

    infoObject: {} = {};

    allIncomeM: number = $state(0);
    allOrgIncomeM: number = $state(0);
    allPartIncomeM: number = $state(0);
    allProfitM: number = $state(0);
    allOrgProfitM: number = $state(0);
    allPartProfitM: number = $state(0);
    allRemainingN: number = $state(0);
    allSoldN: number = $state(0);
    singleOrgPriceM: number = $state(0);
    singlePartPriceM: number = $state(0);
    singleOrgProfitM: number = $state(0);
    singlePartProfitM: number = $state(0);
    singleProductValueM: number = $state(0);
    valueOfSoldProductsM: number = $state(0);
    valueOfSoldProductsOrgM: number = $state(0);
    valueOfSoldProductsPartM: number = $state(0);
    active: boolean = $state(true);
    canAddMore: boolean = $state(true);
    modOverlay: boolean = $state(false);
    delOverlay: boolean = $state(false);
    inBasket: boolean = $state(false);


    constructor(productInfo) {
        this.infoObject = productInfo;
        this.id = productInfo.id;
        this.name = productInfo.name;
        this.organiserProfitMargin = parseFloat(productInfo.organiserProfitMargin);
        this.participantProfitMargin = parseFloat(productInfo.participantProfitMargin);
        this.soldToOrgN = parseFloat(productInfo.soldToOrgN);
        this.soldToPartN = parseFloat(productInfo.soldToPartN);
        this.purchasedN = parseFloat(productInfo.purchasedN);
        this.purchasePriceM = parseFloat(productInfo.purchasePriceM);
        this.code = productInfo.code;
        this.takenOutN = parseFloat(productInfo.takenOutN);

        this.setProps();

    }

    setProps() {
        this.allSoldN = Math.round(this.soldToOrgN + this.soldToPartN);
        this.allRemainingN = Math.round(this.purchasedN - (this.allSoldN + this.takenOutN));
        this.singleProductValueM = Math.round(this.purchasePriceM / this.purchasedN);
        this.singleOrgPriceM = Math.round(this.singleProductValueM / 100 * (100 + this.organiserProfitMargin));
        this.allOrgIncomeM = Math.round(this.singleOrgPriceM * this.soldToOrgN);
        this.singlePartPriceM = Math.round(this.singleProductValueM / 100 * (100 + this.participantProfitMargin));
        this.allPartIncomeM = Math.round(this.singlePartPriceM * this.soldToPartN);
        this.allIncomeM = Math.round(this.allOrgIncomeM + this.allPartIncomeM);
        this.singleOrgProfitM = Math.round(this.singleOrgPriceM - this.singleProductValueM);
        this.singlePartProfitM = Math.round(this.singlePartPriceM - this.singleProductValueM);
        this.allOrgProfitM = Math.round(this.singleOrgProfitM * this.soldToOrgN);
        this.allPartProfitM = Math.round(this.singlePartProfitM * this.soldToPartN);
        this.allProfitM = Math.round(this.allPartProfitM + this.allOrgProfitM - this.purchasePriceM);
        this.valueOfSoldProductsM = this.allSoldN * this.singleProductValueM; //ELÁBÉ
        this.valueOfSoldProductsOrgM = this.soldToOrgN * this.singleProductValueM; //ELÁBÉ
        this.valueOfSoldProductsPartM = this.soldToPartN * this.singleProductValueM; //ELÁBÉ
        if (this.allRemainingN <= 0) {
            this.active = false;
            this.canAddMore = false;
        } else {
            this.active = true;
            this.canAddMore = true;
        }

        //Reset the infoObject
        this.infoObject.id = this.id;
        this.infoObject.name = this.name;
        this.infoObject.organiserProfitMargin = this.organiserProfitMargin;
        this.infoObject.participantProfitMargin = this.participantProfitMargin;
        this.infoObject.soldToOrgN = this.soldToOrgN;
        this.infoObject.soldToPartN = this.soldToPartN;
        this.infoObject.purchasedN = this.purchasedN;
        this.infoObject.purchasePriceM = this.purchasePriceM;
        this.infoObject.code = this.code;
        this.infoObject.takenOutN = this.takenOutN;
    }

    sell(to: "org" | "part" | "to") {

        if (this.allRemainingN <= 0) {
            this.active = false;
            return;
        }
        else if (this.allRemainingN == 1) this.active = false;

        switch (to) {
            case "org":
                this.soldToOrgN += 1;
                break;
            case "part":
                this.soldToPartN += 1;
                break;
            case "to":

                this.takenOutN += 1;
                break;
        }

        //Recalculate all the properties based on the changes
        this.setProps();

    };

    buttonDisabling(basket: Basket) {
        this.canAddMore = true;
        for (const basketElement of basket.products) {
            if (basketElement.prod.id == this.id && basketElement.amt >= this.allRemainingN) {
                this.canAddMore = false;
            }
        }
    };

}

export class Basket {

    products: { prod: Product, price: "org" | "part", amt: number; }[] = $state([]);

    basketType: "org" | "part";

    finalPrice: number = $state(0); // This is needed because I need to recalculate the products' value if the price list changes

    payingSum: number = $state(0); // payed notes set by the selection table
    returnSum: number = $state(0); //change set by note selection table
    payingNotes: { [key: string]: number; } = $state({});
    returnNotes: { [key: string]: number; } = $state({});

    enoughNotes: boolean = $state(false); // true if the customer has given enough notes, false otherwise
    possibleChange: boolean = $state(true); // true if change can be given back, false otherwise

    constructor() {

    }

    addToBasket(prod: Product, price: "org" | "part", all: boolean = false): void {

        return new Promise((resolve, reject) => {

            if (this.products.length == 0) this.basketType = price;

            if (this.basketType !== price) {
                reject("Mixed product prices are not allowed");
                return "Mixed product prices are not allowed";
            }

            for (const product of this.products) {
                if (product.prod == prod && product.price == price) {

                    if (product.amt >= prod.allRemainingN) return "no";

                    all ? product.amt = product.prod.allRemainingN : product.amt += 1;
                    prod.buttonDisabling(this);
                    this.calcFinalPrice();
                    resolve("Product added");
                    return "Product added";
                }
            }

            prod.inBasket = true;
            all ? this.products.push({ prod, price, amt: prod.allRemainingN }) : this.products.push({ prod, price, amt: 1 });
            prod.buttonDisabling(this);
            this.calcFinalPrice();
            resolve("Product added");
            return "Product added";

        });

    };

    removeFromBasket(prod: Product, price: "org" | "part", removeAll?: boolean, removeMost?: boolean): void {

        return new Promise((resolve, reject) => {

            for (const product of this.products) {
                if (product.prod.id == prod.id && product.price == price && product.amt > 1 && !removeAll && !removeMost) {
                    product.amt -= 1;
                    prod.buttonDisabling(this);
                    this.calcFinalPrice();
                    return;
                } else if (product.prod.id == prod.id && product.price == price && product.amt > 1 && !removeAll && removeMost) {
                    product.amt = 1;
                    prod.buttonDisabling(this);
                    this.calcFinalPrice();
                    return;
                } else if (
                    product.prod.id == prod.id && product.price == price && product.amt <= 1 ||
                    product.prod.id == prod.id && product.price == price && removeAll
                ) {
                    this.products.splice(this.products.indexOf(product), 1);
                }
            }

            prod.inBasket = false;
            prod.inBasket = false;
            prod.buttonDisabling(this);
            this.calcFinalPrice();
            resolve("Product deleted");
            return "Product deleted";

        });

    };

    getProduct(prod: Product): { prod: Product, price: "org" | "part", amt: number; } {
        for (const product of this.products) {
            if (product.prod == prod) return product;
        }
    };

    calcFinalPrice(): number {

        let price = 0;

        for (const basketElement of this.products) {
            if (this.basketType == "org") {
                price += basketElement.prod.singleOrgPriceM * basketElement.amt;
            } else if (this.basketType == "part") {
                price += basketElement.prod.singlePartPriceM * basketElement.amt;
            }
        }

        this.finalPrice = price;

    };



}

export class Stats {
    orgIncome: number = $state(0);
    partIncome: number = $state(0);
    orgProfit: number = $state(0);
    partProfit: number = $state(0);
    allIncome: number = $state(0);
    purchasePrice: number = $state(0);
    valueOfSoldProducts: number = $state(0);
    profit: number = $state(0);

    allProducts: number = $state(0);
    inStorage: number = $state(0);
    soldToOrgs: number = $state(0);
    soldToParts: number = $state(0);
    allSoldProducts: number = $state(0);
    takenOut: number = $state(0);

    constructor(products: Product[]) {
        for (const product of products) {           
            this.orgIncome += product.allOrgIncomeM;
            this.partIncome += product.allPartIncomeM;
            this.orgProfit += product.allOrgProfitM;
            this.partProfit += product.allPartProfitM;
            this.allIncome += product.allIncomeM;
            this.purchasePrice += product.purchasePriceM;
            this.valueOfSoldProducts += product.valueOfSoldProductsM;
            this.profit += product.allProfitM;

            this.allProducts += product.purchasedN;
            this.inStorage += product.allRemainingN;
            this.soldToOrgs += product.soldToOrgN;
            this.soldToParts += product.soldToPartN;
            this.allSoldProducts += product.allSoldN;
            this.takenOut += product.takenOutN;
        }
    }
}

export class SellEvent {
    notesC: {} = $state({});
    notesP: {} = $state({});
    productB: Product = $state([]);
    productA: Product = $state([]);
    timestamp: number = $state(0);
    id: string = $state("");
    basketID: string = $state("");
    productID: string = $state("");

    soldTo: "org" | "part" | "to" = $state("");
    dateTime: string = $state("");
    time: string = $state("");
    seconds: string = $state("");
    profitOfSale: number = $state(0);
    incomeOfSale: number = $state(0);


    constructor(products: Product[], event: {}) {

        this.timestamp = parseInt(event.timestamp);
        this.basketID = event.basketID;
        this.id = event.id;
        this.productID = event.productID;


        //Notes
        this.notesC = {
            "5": event["5_C"],
            "50": event["50_C"],
            "500": event["500_C"],
            "5000": event["5000_C"],
            "10": event["10_C"],
            "100": event["100_C"],
            "1000": event["1000_C"],
            "10000": event["10000_C"],
            "20": event["20_C"],
            "200": event["200_C"],
            "2000": event["2000_C"],
            "20000": event["20000_C"]
        };
        this.notesP = {
            "5": event["5_P"],
            "50": event["50_P"],
            "500": event["500_P"],
            "5000": event["5000_P"],
            "10": event["10_P"],
            "100": event["100_P"],
            "1000": event["1000_P"],
            "10000": event["10000_P"],
            "20": event["20_P"],
            "200": event["200_P"],
            "2000": event["2000_P"],
            "20000": event["20000_P"]
        };



        //Product
        let product: Product;

        for (const prod of products) {
            if (prod.id !== event.productID) continue;

            product = prod;
        }

        product.infoObject.soldToOrgN = event.soldToOrgN_B;
        product.infoObject.soldToPartN = event.soldToPartN_B;
        product.infoObject.takenOutN = event.takenOutN_B;

        this.productB = new Product(product.infoObject);

        product.infoObject.soldToOrgN = event.soldToOrgN_A;
        product.infoObject.soldToPartN = event.soldToPartN_A;
        product.infoObject.takenOutN = event.takenOutN_A;

        this.productA = new Product(product.infoObject);

        //Profit
        this.profitOfSale = this.productA.allProfitM - this.productB.allProfitM;
        this.incomeOfSale = this.productA.allIncomeM - this.productB.allIncomeM;

        //Income

        //Timestamp
        let date = new Date();
        date.setTime(this.timestamp);
        let months = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        this.seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;

        this.dateTime = `${date.getFullYear()}-${months}-${date.getDate()} ${hours}:${minutes}`;

        this.time = `${hours}:${minutes}`;

        //Sold To
        if (this.productB.soldToOrgN - this.productA.soldToOrgN !== 0) {
            this.soldTo = "org";
        } else if (this.productB.soldToPartN - this.productA.soldToPartN !== 0) {
            this.soldTo = "part";
        } else if (this.productB.takenOutN - this.productA.takenOutN !== 0) {
            this.soldTo = "to";
        }


    };
}
