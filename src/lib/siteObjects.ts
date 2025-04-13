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
        this.organiserProfitMargin = productInfo.organiserProfitMargin;
        this.participantProfitMargin = productInfo.participantProfitMargin;
        this.soldToOrgN = productInfo.soldToOrgN;
        this.soldToPartN = productInfo.soldToPartN;
        this.purchasedN = productInfo.purchasedN;
        this.purchasePriceM = productInfo.purchasePriceM;
        if (productInfo.active == "true") {
            this.active = true;
        } else {
            this.active = false;
        }

        this.allIncomeM = this.allOrgIncomeM + this.allPartIncomeM;
        this.allOrgIncomeM = this.singleOrgPriceM * this.soldToOrgN;
        this.allPartIncomeM = this.singlePartPriceM * this.soldToPartN;
        this.allProfitM = this.allOrgProfitM + this.allPartProfitM;
        this.allOrgProfitM = this.singleOrgProfitM * soldToOrgN;
        this.allPartProfitM = this.singlePartProfitM * soldPartOrgN;
        this.allRemainingN = this.purchasedN - this.allSoldN;
        this.allSoldN = this.soldToOrgN + soldToPartN;
        this.singleOrgPriceM = this.singleProductValueM / 100 * (100 + organiserProfitMargin);
        this.singlePartPriceM = this.singleProductValueM / 100 * (100 + participantProfitMargin);
        this.singleOrgProfitM = this.singleOrgPriceM - this.singleProductValueM;
        this.singlePartProfitM = this.singlePartPriceM - this.singleProductValueM;
        this.singleProductValueM = this.purchasePriceM / this.purchasedN;

    }
}