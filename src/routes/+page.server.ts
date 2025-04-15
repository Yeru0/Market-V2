import { writeTable, readTable } from "$lib/db/db";
import { Table, Record } from "$lib/db/dbObjects";

export async function load() {

    let products: any = [];
    let notes: any = [];

    const prodTable = await readTable("products");
    for (const record of prodTable.getRecords()) {
        products.push({ ...record });
    }

    const noteTable = await readTable("notes");
    for (const record of noteTable.getRecords()) {
        notes.push({ ...record });
    }

    return {
        products,
        notes
    };

};