import { error } from "@sveltejs/kit";

export const load = async ({ fetch }) => {


    let products: any = [];

    try {
        const productFetch = await fetch("/api/product");
        products = await productFetch.json();
    } catch (err) {
        error(500, err);
    }

    return {
        products
    };

};