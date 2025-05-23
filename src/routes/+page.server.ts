import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	let products: any = [];
	let notes: any = [];

	try {
		const productFetch = await fetch('/api/product');
		products = await productFetch.json();

		const notesFetch = await fetch('/api/notes/read');
		notes = await notesFetch.json();
	} catch (err) {
		error(500, err);
	}

	return {
		notes,
		products
	};
};
