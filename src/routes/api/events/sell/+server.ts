import { error } from "@sveltejs/kit";
import { writeTable, readTable } from "$lib/db/db";
import { Table } from "$lib/db/dbObjects";


export const POST = async ({ request }) => {

    // data expects: notesP, notesC, productA, productB
    let data = JSON.parse(await request.text());



    let basketID: string = crypto.randomUUID();


    let payingNotes: {}[] = data.notesP;
    let changeNotes: {}[] = data.notesC;
    let prodBefore: {}[] = data.productB;
    let prodAfter: {}[] = data.productA;
    let table: Table = await readTable("sellEvents");



    for (let i = 0; i < prodBefore.length; i++) {
        await table.newRecord(
            [
                basketID,
                new Date().getTime(),
                prodBefore[i].soldToOrgN,
                prodBefore[i].soldToPartN,
                prodBefore[i].takenOutN,
                prodAfter[i].soldToOrgN,
                prodAfter[i].soldToPartN,
                prodAfter[i].takenOutN,
                payingNotes["5"],
                payingNotes["10"],
                payingNotes["20"],
                payingNotes["50"],
                payingNotes["100"],
                payingNotes["200"],
                payingNotes["500"],
                payingNotes["1000"],
                payingNotes["2000"],
                payingNotes["5000"],
                payingNotes["10000"],
                payingNotes["20000"],
                changeNotes["5"],
                changeNotes["10"],
                changeNotes["20"],
                changeNotes["50"],
                changeNotes["100"],
                changeNotes["200"],
                changeNotes["500"],
                changeNotes["1000"],
                changeNotes["2000"],
                changeNotes["5000"],
                changeNotes["10000"],
                changeNotes["20000"]
            ],
            true
        );
    }

    await writeTable(table, true);
    return new Response(null, { status: 204 });
};