import { writeTable, readTable } from "./lib/db/db";
import { Record, Table } from "./lib/db/dbObjects";

export async function handle({ event, resolve }) {

    if (event.url.pathname === "/api/product/sell" && event.request.method === "POST") {
        // data expects: ID, active, soldToOrgN, soldToPartN
        let data = JSON.parse(await event.request.text());

        let soldProducts: {}[] = data.soldProducts;
        let table: Table = await readTable("products");

        for (const product of soldProducts) {
            let sameProd = await table.getRecord(product.id);
            if (product.soldToOrgN + product.soldToPartN > parseInt(sameProd.getField("purchasedN"))) return;

            await table.updateRecord(
                product.id,
                [
                    product.id,
                    sameProd.name,
                    sameProd.organiserProfitMargin,
                    sameProd.participantProfitMargin,
                    `${product.soldToOrgN}`,
                    `${product.soldToPartN}`,
                    `${product.takenOutN}`,
                    sameProd.purchasedN,
                    sameProd.purchasePriceM,
                    sameProd.code
                ]
            );
        }


        writeTable(table, true);

    }
    else if (event.url.pathname === "/api/notes/sell" && event.request.method === "POST") {
        // data expects: ID, active, soldToOrgN, soldToPartN
        let data = JSON.parse(await event.request.text());

        let notes: {}[] = data.notes;
        let table: Table = await readTable("notes");

        await table.updateRecord(
            "a",
            [
                notes["5"],
                notes["10"],
                notes["20"],
                notes["50"],
                notes["100"],
                notes["200"],
                notes["500"],
                notes["1000"],
                notes["2000"],
                notes["5000"],
                notes["10000"],
                notes["20000"],
                "a"
            ]
        );

        writeTable(table, true);

    }
    else if (event.url.pathname === "/api/events/sell" && event.request.method === "POST") {
        // data expects: ID, active, soldToOrgN, soldToPartN
        let data = JSON.parse(await event.request.text());

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

        writeTable(table, true);

    }

    return await resolve(event);
}