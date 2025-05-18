import { writeTable, readTable } from '$lib/db/db';
import { Table } from '$lib/db/dbObjects';

export const POST = async ({ request }) => {
	// data expects: name, organiserProfitMargin, participantProfitMargin, purchasePriceM, purchasePriceN and barcode
	let data = JSON.parse(await request.text());
	let table: Table = await readTable('products');

	if (data.id === '') return new Response(null, { status: 204 });

	try {
		await table.deleteRecord(data.id);

		await writeTable(table, true);

		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return new Response(null, { status: 500 });
	}
};
