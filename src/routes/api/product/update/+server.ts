import { writeTable, readTable } from '$lib/db/db';
import { Table } from '$lib/db/dbObjects';

export const POST = async ({ request }) => {
	// data expects: name, organiserProfitMargin, participantProfitMargin, purchasePriceM, purchasePriceN and barcode
	let data = JSON.parse(await request.text());
	let table: Table = await readTable('products');

	if (
		data.id === '' ||
		data.name === '' ||
		data.organiserProfitMargin === 0 ||
		data.participantProfitMargin === 0 ||
		data.purchasedM === 0 ||
		data.purchasedN === 0 ||
		data.barcode === ''
	)
		return new Response(null, { status: 204 });

	try {
		await table.updateRecord(data.id, [
			data.id,
			data.name,
			data.organiserProfitMargin,
			data.participantProfitMargin,
			data.soldToOrgN,
			data.soldToPartN,
			data.takenOutN,
			data.purchasedN,
			data.purchasePriceM,
			data.code
		]);

		await writeTable(table, true);

		return new Response(null, { status: 204 });
	} catch (error) {
		return new Response(null, { status: 500 });
	}
};
