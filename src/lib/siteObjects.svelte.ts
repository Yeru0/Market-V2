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
    // modOverlay: boolean = false
    singleOrgPriceM: number = $state(0);
    singlePartPriceM: number = $state(0);
    singleOrgProfitM: number = $state(0);
    singlePartProfitM: number = $state(0);
    singleProductValueM: number = $state(0);
    active: boolean = $state(true);
    canAddMore: boolean = $state(true);


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
        this.allProfitM = Math.round(this.allOrgProfitM + this.allPartProfitM);
        if (this.allRemainingN <= 0) {
            this.active = false;
            this.canAddMore = false;
        } else {
            this.active = true;
            this.canAddMore = true;
        }
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

        // Update notes
        // Update income or stats or whatever
        // Register sell event
        // Update db of notes, products, events and stats
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

                    all ? product.amt = product.prod.allRemainingN : product.amt += 1;
                    prod.buttonDisabling(this);
                    resolve("Product added");
                    return "Product added";
                }
            }

            all ? this.products.push({ prod, price, amt: prod.allRemainingN }) : this.products.push({ prod, price, amt: 1 });
            prod.buttonDisabling(this);
            resolve("Product added");
            return "Product added";

        });

    };

    removeFromBasket(prod: Product, price: "org" | "part", removeAll?: boolean, removeMost?: boolean): void {

        return new Promise((resolve, reject) => {

            for (const product of this.products) {
                if (product.prod == prod && product.price == price && product.amt > 1 && !removeAll && !removeMost) {
                    product.amt -= 1;
                } else if (product.prod == prod && product.price == price && product.amt > 1 && !removeAll && removeMost) {
                    product.amt = 1;
                } else if (product.prod == prod && product.price == price && product.amt <= 1 || removeAll) {
                    this.products.splice(this.products.indexOf(product), 1);
                } else {
                    prod.buttonDisabling(this);
                    reject("Something went wrong");
                    return "Something went wrong";
                }
            }

            prod.buttonDisabling(this);
            resolve("Product deleted");
            return "Product deleted";

        });

    };

    getProduct(prod: Product): { prod: Product, price: "org" | "part", amt: number; } {
        for (const product of this.products) {
            if (product.prod == prod) return product;
        }
    };

    get finalPrice(): number {
        let price: number = 0;

        for (const basketElement of this.products) {
            if (basketElement.price == "org") {
                price += basketElement.prod.singleOrgPriceM * basketElement.amt;
            } else if (basketElement.price == "part") {
                price += basketElement.prod.singlePartPriceM * basketElement.amt;
            }
        }

        return price;
    };



}
