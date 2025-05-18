import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	let notes: any = [];
	let products: any = [];

	try {
		//Products
		const productFetch = await fetch('/api/product');
		products = await productFetch.json();

		// Notes
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
