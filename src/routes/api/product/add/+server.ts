import { writeTable, readTable } from "$lib/db/db";
import { Table } from "$lib/db/dbObjects";


export const POST = async ({ request }) => {

    // data expects: name, organiserProfitMargin, participantProfitMargin, purchasePriceM, purchasePriceN and barcode
    let data = JSON.parse(await request.text());
    let table: Table;

    try {
        table = await readTable("products");
    } catch {
        table = new Table(
            ["id", "name", "organiserProfitMargin", "participantProfitMargin", "soldToOrgN", "soldToPartN", "takenOutN", "purchasedN", "purchasePriceM", "code"],
            [],
            "products"
        );
    }

    if (
        data.name === "" ||
        data.organiserProfitMargin <= 0 ||
        data.participantProfitMargin <= 0 ||
        data.purchasePriceM <= 0 ||
        data.purchasedN <= 0 ||
        data.code === ""
    ) return new Response(null, { status: 204 });

    try {


        await table.newRecord(
            [
                data.id,
                data.name,
                data.organiserProfitMargin,
                data.participantProfitMargin,
                0,
                0,
                0,
                data.purchasedN,
                data.purchasePriceM,
                data.code
            ],
            false
        );

        await writeTable(table, true);

        return new Response(null, { status: 204 });

    } catch (error) {

        console.error(error);
        return new Response(null, { status: 500 });
    };

};