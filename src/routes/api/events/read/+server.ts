import { error, json } from "@sveltejs/kit";
import { readTable } from "$lib/db/db";
import { Table } from "$lib/db/dbObjects";


export const GET = async ({ request }) => {


    let table: Table = await readTable("sellEvents");
    let events: {}[] = [];

    for (const event of table.records) {
        events.push({ ...event });
    }


    return json(events);
};