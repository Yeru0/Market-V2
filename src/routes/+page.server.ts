import { writeTable, readTable } from "$lib/db/db";
import { Table, Record } from "$lib/db/dbObjects";

export async function load() {

    let products: any = [];
    let notes: any = [];
    let sellEvents: any = [];

    const prodTable = await readTable("products");
    for (const record of prodTable.getRecords()) {
        products.push({ ...record });
    }

    const noteTable = await readTable("notes");
    for (const record of noteTable.getRecords()) {
        notes.push({ ...record });
    }

    // const sellEventTable = await readTable("sellEvents");
    // for (const record of sellEventTable.getRecords()) {
    //     sellEvents.push({ ...record });
    // }

    return {
        products,
        notes
    };

};