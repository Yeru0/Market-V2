import { writeTable, readTable } from "./lib/db/db";
import { Table } from "./lib/db/dbObjects";

export async function handle({ event, resolve }) {

    if (event.url.pathname === "/api/sell/product") {
        // data expects: ID, active, soldToOrgN, soldToPartN
        let data = JSON.parse(await event.request.text());

        let table: Table = await readTable("products");



        table.updateRecord(data.id, ["31a1a4eb-78b1-4a44-8ffd-e4d8d7c237c1", "Tejföl2", "25", "95", data.soldToOrgN, data.soldToPartN, "30", "8000", data.active, "1"]);

    }

    return await resolve(event);
}