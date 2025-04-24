<script lang="ts">
    import { enhance } from "$app/forms"
	import { Product } from "$lib/siteObjects.svelte";
    import { onMount } from "svelte";

    let {
        products = $bindable()
    } = $props()

    let id: string = $state("")

    let data = $state({
        purchasedN: 0,
        purchasedM: 0,
        organiserProfitMargin: 0,
        participantProfitMargin: 0,
        organiserPrice: 0,
        participantPrice: 0,
    })

    onMount(async () => {
        //Give a random uuid from the server
        let DBUUIDResponse = (await fetch("/api/uuid", { method: "GET" }));

        const reader = DBUUIDResponse.body?.getReader();
        let done, value;

        // Read the stream until it's done   
        if (reader) {
            let idWithQmark: string = ""
            while ({ done, value } = await reader.read(), !done) {
                let newValue = new TextDecoder().decode(value)
                idWithQmark += newValue;
            }
            for (const l of idWithQmark) {
                if (l === "\"") continue
                id += l
            }
        }
        
    })


    const handleSubmit = (e: SubmitEvent): void => {
        let form = e.target as HTMLFormElement
        if (form === null) return
        let formData = new FormData(form)

        products.push(new Product({
            id: id,
            name: formData.get("product-name"),
            organiserProfitMargin: formData.get("organiser-profit-margin"),
            participantProfitMargin: formData.get("participant-profit-margin"),
            soldToOrgN: 0,
            soldToPartN: 0,
            purchasedN: formData.get("purchased-amount"),
            purchasePriceM: formData.get("purchase-price"),
            code: formData.get("barcode"),
            takenOutN: 0,
        }))                    

        products = [...products].sort((a: Product, b: Product) => {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {                
                return -1;
            } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
            } else {           
                return 0;
            }
        })
        
    }

    const calcPrice = (to: "org" | "part" | "b") => {
        switch (to) {
            case "org":
                data.organiserPrice = Math.round((data.purchasedM / data.purchasedN) / 100 * (100 + data.organiserProfitMargin));
                break
            case "part":
                data.participantPrice = Math.round((data.purchasedM / data.purchasedN) / 100 * (100 + data.participantProfitMargin));
                break
            case "b":
                data.participantPrice = Math.round((data.purchasedM / data.purchasedN) / 100 * (100 + data.participantProfitMargin));
                data.organiserPrice = Math.round((data.purchasedM / data.purchasedN) / 100 * (100 + data.organiserProfitMargin));
                break
        }
    }

    const calcPercent = (to: "org" | "part" | "b") => {
        switch (to) {
            case "org":
                data.organiserProfitMargin = (data.organiserPrice / ((data.purchasedM / data.purchasedN) / 100)) - 100
                break
            case "part":
                data.participantProfitMargin = (data.participantPrice / ((data.purchasedM / data.purchasedN) / 100)) - 100
                break
            case "b":
                data.participantProfitMargin = (data.participantPrice / ((data.purchasedM / data.purchasedN) / 100)) - 100
                data.organiserProfitMargin = (data.organiserPrice / ((data.purchasedM / data.purchasedN) / 100)) - 100
                break
        }
    }

</script>

<div>

    <h2>Termék hozzáadása</h2>

    <form method="post" action="?/create" onsubmit={handleSubmit} use:enhance>

        <input type="hidden" name="product-id" id="product-id" value="{id}">

        <label for="product-name" class="product-name">
            Terméknév
            <input type="text" name="product-name" required>
        </label>
        
        <label for="purchased-amount" class="purchased-amount">
            Beszerzett mennyiség
            <input type="number" name="purchased-amount" required bind:value={data.purchasedN} onchange={() => { calcPrice("b"); calcPercent("b") }}> db
        </label>

        <label for="purchase-price" class="purchase-price">
            Beszerzési ár
            <input type="number" name="purchase-price" required bind:value={data.purchasedM} onchange={() => { calcPercent("b"); calcPrice("b") }}> Ft
        </label>

        <label for="organiser-profit-margin" class="organiser-profit-margin">
            Szervezői haszonkulcs
            <input type="number" name="organiser-profit-margin" required bind:value={data.organiserProfitMargin} onchange={() => {calcPrice("org")}}> %
        </label>

        <label for="organiser-price" class="organiser-price">
            Szervezői ár
            <input type="number" name="organiser-price" required bind:value={data.organiserPrice} onchange={() => {calcPercent("org")}}> Ft
        </label>
        
        <label for="participant-profit-margin" class="participant-profit-margin">
            Résztvevői haszonkulcs
            <input type="number" name="participant-profit-margin" required bind:value={data.participantProfitMargin} onchange={() => {calcPrice("part")}}> %
        </label>

        <label for="participant-price" class="participant-price">
            Résztvevői ár
            <input type="number" name="participant-price" required bind:value={data.participantPrice} onchange={() => {calcPercent("part")}}> Ft
        </label>

        <label for="barcode" class="barcode">
            Vonalkód
            <input type="text" name="barcode" required>
        </label>

        <div class="submit-buttons">
            <button type="submit" class="submit">Termék hozzáadása</button>
            <button type="reset" class="cancel">Mégsem</button>
        </div>

    </form>

</div>