import { readTable } from "$lib/db/db";

export async function load() {

    let products: any = [];

    const prodTable = await readTable("products");
    for (const record of prodTable.getRecords()) {
        products.push({ ...record });
    }

    return {
        products
    };

};