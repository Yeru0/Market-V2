import { writeTable, readTable } from "$lib/db/db";
import { Table, Record } from "$lib/db/dbObjects";
import { json } from "@sveltejs/kit";

export const GET = async () => {
    let products: { [key: any]: string; }[] = [];

    const prodTable = await readTable("products");
    for (const record of prodTable.getRecords()) {
        products.push({ ...record });
    }

    return json(products);
};

export const POST = async () => {
    let products: { [key: any]: string; }[] = [];

    const prodTable = await readTable("products");
    for (const record of prodTable.getRecords()) {
        products.push({ ...record });
    }

    return json(products);
};