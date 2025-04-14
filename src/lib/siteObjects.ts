export class Product {
    id: string;
    name: string;
    organiserProfitMargin: number;
    participantProfitMargin: number;
    soldToOrgN: number;
    soldToPartN: number;
    purchasedN: number;
    purchasePriceM: number;
    active: boolean;

    allIncomeM: number;
    allOrgIncomeM: number;
    allPartIncomeM: number;
    allProfitM: number;
    allOrgProfitM: number;
    allPartProfitM: number;
    allRemainingN: number;
    allSoldN: number;
    // modOverlay: boolean = false
    singleOrgPriceM: number;
    singlePartPriceM: number;
    singleOrgProfitM: number;
    singlePartProfitM: number;
    singleProductValueM: number;


    constructor(productInfo) {
        this.id = productInfo.id;
        this.name = productInfo.name;
        this.organiserProfitMargin = parseFloat(productInfo.organiserProfitMargin);
        this.participantProfitMargin = parseFloat(productInfo.participantProfitMargin);
        this.soldToOrgN = parseFloat(productInfo.soldToOrgN);
        this.soldToPartN = parseFloat(productInfo.soldToPartN);
        this.purchasedN = parseFloat(productInfo.purchasedN);
        this.purchasePriceM = parseFloat(productInfo.purchasePriceM);
        if (productInfo.active == "true") {
            this.active = true;
        } else {
            this.active = false;
        }

        this.allSoldN = Math.round(this.soldToOrgN + this.soldToPartN);
        this.allRemainingN = Math.round(this.purchasedN - this.allSoldN);
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

    }
}