import { error } from '@sveltejs/kit';
import { writeTable, readTable } from '$lib/db/db';
import { Table } from '$lib/db/dbObjects';

export const PUT = async ({ request }) => {
	// data expects: ID, active, soldToOrgN, soldToPartN
	let data = JSON.parse(await request.text());

	let notes: {}[] = data.notes;
	let table: Table = await readTable('notes');

	await table.updateRecord('a', [
		notes['5'],
		notes['10'],
		notes['20'],
		notes['50'],
		notes['100'],
		notes['200'],
		notes['500'],
		notes['1000'],
		notes['2000'],
		notes['5000'],
		notes['10000'],
		notes['20000'],
		'a'
	]);

	writeTable(table, true);
	return new Response(null, { status: 204 });
};
