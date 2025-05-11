import { writeTable, readTable } from "$lib/db/db";
import { Table, Record } from "$lib/db/dbObjects";
import { json } from "@sveltejs/kit";

export const GET = async () => {
    let products: { [key: any]: string; }[] = [];

    try {
        const prodTable = await readTable("products");
        for (const record of prodTable.getRecords()) {
            products.push({ ...record });
        }
    } catch (err) {
        // console.error(err);
    }

    return json(products);
};
