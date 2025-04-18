import { writeTable, readTable } from "./lib/db/db";
import { Record, Table } from "./lib/db/dbObjects";
import { Product } from "./lib/siteObjects.svelte";

export async function handle({ event, resolve }) {

    if (event.url.pathname === "/api/sell/product", event.request.method === "POST") {
        // data expects: ID, active, soldToOrgN, soldToPartN
        let data = JSON.parse(await event.request.text());

        let soldProducts: {}[] = data.soldProducts;
        let table: Table = await readTable("products");


        for (const product of soldProducts) {
            let sameProd = await table.getRecord(product.id);
            if (product.soldToOrgN + product.soldToPartN > parseInt(sameProd.getField("purchasedN"))) return;
            await table.updateRecord(
                product.id,
                [sameProd.id, sameProd.name, sameProd.organiserProfitMargin, sameProd.participantProfitMargin, `${product.soldToOrgN}`, `${product.soldToPartN}`, `${product.takenOutN}`, sameProd.purchasedN, sameProd.purchasePriceM, sameProd.code]
            );
        }


        writeTable(table, true);

    }

    return await resolve(event);
}