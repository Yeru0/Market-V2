import { writeTable, readTable } from "$lib/db/db";
import { Table, Record } from "$lib/db/dbObjects";
import { json } from "@sveltejs/kit";

export const GET = async () => {
    let notes: { [key: any]: string; }[] = [];

    const prodTable = await readTable("notes");
    for (const record of prodTable.getRecords()) {
        notes.push({ ...record });
    }

    return json(notes);
};