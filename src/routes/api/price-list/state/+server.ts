import { writeTable, readTable } from '$lib/db/db';
import { Table } from '$lib/db/dbObjects';
import { json } from '@sveltejs/kit';

export const PUT = async ({ request }) => {
	// data expects: ID, active, soldToOrgN, soldToPartN
	let data = JSON.parse(await request.text());

	let state: boolean = data.priceListState == 'true' ? true : false;
	let table: Table = await readTable('priceListState');

	await table.updateRecord('0', ['0', state]);

	writeTable(table, true);
	return new Response(null, { status: 204 });
};

export const GET = async ({ request }) => {
	let table: Table = await readTable('priceListState');

	let stateRecord: Record = await table.getRecord('0');
	let state: boolean = stateRecord.getField('state') == 'true' ? true : false;

	return json(state);
};
