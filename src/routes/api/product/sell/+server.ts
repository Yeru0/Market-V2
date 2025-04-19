import { error } from "@sveltejs/kit";
import { writeTable, readTable } from "$lib/db/db";
import { Table } from "$lib/db/dbObjects";


export const PUT = async ({ request }) => {

    // data expects: ID, active, soldToOrgN, soldToPartN
    let data = JSON.parse(await request.text());

    let soldProducts: {}[] = data.soldProducts;
    let table: Table = await readTable("products");

    for (const product of soldProducts) {
        let sameProd = await table.getRecord(product.id);
        if (product.soldToOrgN + product.soldToPartN > parseInt(sameProd.getField("purchasedN"))) return;

        await table.updateRecord(
            product.id,
            [
                product.id,
                sameProd.name,
                sameProd.organiserProfitMargin,
                sameProd.participantProfitMargin,
                `${product.soldToOrgN}`,
                `${product.soldToPartN}`,
                `${product.takenOutN}`,
                sameProd.purchasedN,
                sameProd.purchasePriceM,
                sameProd.code
            ]
        );
    }


    writeTable(table, true);
    return new Response(null, { status: 204 });
};