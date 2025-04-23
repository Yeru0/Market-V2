import { error } from "@sveltejs/kit";
import { readTable, writeTable } from "$lib/db/db";
import { redirect, error } from "@sveltejs/kit";

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

export const actions = {
    create: async ({ request }) => {

        // data expects: name, organiserProfitMargin, participantProfitMargin, purchasePriceM, purchasePriceN and barcode
        let data: FormData = await request.formData();
        let table: Table = await readTable("products");

        if (
            data.get("product-name") === "" ||
            data.get("organiser-profit-margin") === "" ||
            data.get("participant-profit-margin") === "" ||
            data.get("purchase-price") === "" ||
            data.get("purchased-amount") === "" ||
            data.get("barcode") === ""
        ) return;

        try {

            await table.newRecord(
                [
                    data.get("product-id"),
                    data.get("product-name"),
                    data.get("organiser-profit-margin"),
                    data.get("participant-profit-margin"),
                    0,
                    0,
                    0,
                    data.get("purchased-amount"),
                    data.get("purchase-price"),
                    data.get("barcode")
                ],
                false
            );

            await writeTable(table, true);


            let formData: {} = {
                id: data.get("product-id"),
                name: data.get("product-name"),
                organiserProfitMargin: data.get("organiser-profit-margin"),
                participantProfitMargin: data.get("participant-profit-margin"),
                purchasedN: data.get("purchased-amount"),
                purchasePriceM: data.get("purchase-price"),
                code: data.get("barcode")
            };




            return { success: true, formData: JSON.stringify(formData) };

        } catch (error) {
            return { success: false };
        }

    },

    update: async ({ request }) => {

        // data expects: name, organiserProfitMargin, participantProfitMargin, purchasePriceM, purchasePriceN and barcode
        let data = await request.formData();
        let table: Table = await readTable("products");


        if (
            data.get("product-name") === "" ||
            data.get("organiser-profit-margin") === "" ||
            data.get("participant-profit-margin") === "" ||
            data.get("product-sold-to-org") === "" ||
            data.get("product-sold-to-part") === "" ||
            data.get("product-taken-out") === "" ||
            data.get("purchased-amount") === "" ||
            data.get("purchase-price") === "" ||
            data.get("barcode") === ""
        ) return;

        try {

            await table.updateRecord(
                data.get("product-id"),
                [
                    data.get("product-id"),
                    data.get("product-name"),
                    data.get("organiser-profit-margin"),
                    data.get("participant-profit-margin"),
                    data.get("product-sold-to-org"),
                    data.get("product-sold-to-part"),
                    data.get("product-taken-out"),
                    data.get("purchased-amount"),
                    data.get("purchase-price"),
                    data.get("barcode")
                ]
            );

            await writeTable(table, true);

            return { success: true };

        } catch (error) {
            console.error(error);
            return { success: false };
        }

    },

    delete: async ({ request }) => {
        // data expects: name, organiserProfitMargin, participantProfitMargin, purchasePriceM, purchasePriceN and barcode
        let data = await request.formData();
        let table: Table = await readTable("products");

        if (
            data.get("product-id") === ""
        ) return;

        try {

            await table.deleteRecord(data.get("product-id"));

            await writeTable(table, true);

            return { success: true };

        } catch (error) {
            console.error(error);
            return { success: false };
        }

    }
};
