<script lang="ts">
	import { priceListWebSocket } from "$lib/shared.svelte";
	import { orderStorage } from "$lib/siteMethods";
	import { Product } from "$lib/siteObjects.svelte";
    import { onDestroy, onMount } from "svelte";

    let {
        products = $bindable(),
        toast = $bindable(),
        showOverlay = $bindable()
    } = $props()

    let id: string = $state("")

    let data = $state({
        // svelte-ignore state_referenced_locally
        id,
        name: "",
        purchasedN: 0,
        purchasedM: 0,
        organiserProfitMargin: 0,
        participantProfitMargin: 0,
        organiserPrice: 0,
        participantPrice: 0,
        barcode: "",
        free: false,
        priceInputType: "percent",
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
        
        data.id = id
        

    })


    const handleSubmit = async (e: SubmitEvent) => {

        try {

            data.barcode = data.barcode.substring(1) // Remove first character cause of code reading reasons

            // Send the added product to the database
            await fetch("/api/product/add", {
                method: "POST",
                body: JSON.stringify({
                    ...data
                })
            });
            
            let form = e.target as HTMLFormElement
            if (form === null) return
            let formData = new FormData(form)
            
            if (
                data.id === "" ||
                data.name === "" ||
                data.organiserProfitMargin <= 0 ||
                data.participantProfitMargin <= 0 ||
                data.purchasedM <= 0 ||
                data.purchasedN <= 0 ||
                data.barcode === ""
            ) return 
            
            products.push(new Product({
                id: id,
                name: formData.get("product-name"),
                organiserProfitMargin: formData.get("organiser-profit-margin"),
                participantProfitMargin: formData.get("participant-profit-margin"),
                soldToOrgN: 0,
                soldToPartN: 0,
                takenOutN: 0,
                purchasedN: formData.get("purchased-amount"),
                purchasePriceM: formData.get("purchase-price"),
                code: formData.get("barcode"),
            }))                    
            
            products = orderStorage(products)

            $priceListWebSocket.ws.send(JSON.stringify({products: {...products}, id: $priceListWebSocket.id})) // Update the price list

            showOverlay = false

            toast = {
                time: 3000,
                text: "A termék létrehozva!",
                show: true
            }

        } catch (err) {          
                toast = {
                    time: 3000,
                    text: "A termék létrehozása sikertelen volt!",
                    show: true
                }
        }


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
                data.organiserProfitMargin = Math.round((data.organiserPrice / ((data.purchasedM / data.purchasedN) / 100)) - 100)
                break
            case "part":
                data.participantProfitMargin = Math.round((data.participantPrice / ((data.purchasedM / data.purchasedN) / 100)) - 100)
                break
            case "b":
                data.participantProfitMargin = Math.round((data.participantPrice / ((data.purchasedM / data.purchasedN) / 100)) - 100)
                data.organiserProfitMargin = Math.round((data.organiserPrice / ((data.purchasedM / data.purchasedN) / 100)) - 100)
                break
        }
    }

    // Hide body scrollbar
	onMount(() => {
		document.body.classList.add('noscroll');
    })
	onDestroy(() => {
		document.body.classList.remove('noscroll');
    })

</script>



<style>

    h2 {
        margin: var(--n-m) auto;
    }

	.inner-overlay {
		border-radius: var(--n-m);
		padding: var(--n-l);
        width: fit-content;
        margin: auto;
	}

    .radio {
        margin: 0;

        display: grid;
        place-content: center;
        grid-template-columns: auto;
        grid-template-rows: repeat(2, auto);
        grid-template-areas:
        "p"
        "buttons";

        & p {
            grid-area: p;
        }
        & .buttons {
            grid-area: buttons;
        }
    }

    .button {
            display: grid;
            padding-bottom: var(--n-xxs);
            align-items: center;
            grid-template-columns: repeat(2, auto);
            grid-template-rows: auto;
            grid-template-areas: 
            "label input";

            & label {
                grid-area: label;
                padding-right: var(--n-xs);
                height: min-content;
            }
            & input {
                grid-area: input;
                justify-self: end;
            }
    }


</style>



<svelte:window
    onkeyup={(e) => {
        if (e.key == "Escape") {
            showOverlay = false
        }
    }}
/>



<div class="inner-overlay">

    <h2>Termék hozzáadása</h2>

    <form onsubmit={handleSubmit}>

        <input type="hidden" name="product-id" id="product-id" value="{id}">

        <div class="form-label radio">
            <div class="buttons">
                {#each ["percent", "value"] as type}
                    <div class="button">
                        <label for="{type}">
                            {type == "percent" ? "Százalékos ár: " : "Számos ár: "}
                        </label>
                        <input type="radio" name="{type}" class="{type}" value={type} bind:group={data.priceInputType}>
                    </div>
                {/each}
            </div>
        </div>
            
        
        <div class="form-label">
            <label for="product-name" class="product-name">
                Terméknév
            </label>
            <input type="text" name="product-name" required bind:value={data.name}>
        </div>
        
        <div class="form-label">
            <label for="purchased-amount" class="purchased-amount">
                Beszerzett mennyiség
            </label>
            <input type="number" name="purchased-amount" required bind:value={data.purchasedN} onchange={() => { calcPrice("b"); calcPercent("b") }}>
        </div>

        <div class="form-label">
            <label for="purchase-price" class="purchase-price">
                Beszerzési ár
            </label>
            <input type="number" name="purchase-price" required bind:value={data.purchasedM} onchange={() => { calcPercent("b"); calcPrice("b") }}>
        </div>

        {#if data.priceInputType == "percent"}
            
            <div class="form-label">
                <label for="organiser-profit-margin" class="organiser-profit-margin">
                    Szervezői haszonkulcs
                </label>
                <input type="number" name="organiser-profit-margin" required bind:value={data.organiserProfitMargin} onchange={() => {calcPrice("org")}}>
            </div>

            <div class="form-label">
                <label for="participant-profit-margin" class="participant-profit-margin">
                    Résztvevői haszonkulcs
                </label>
                <input type="number" name="participant-profit-margin" required bind:value={data.participantProfitMargin} onchange={() => {calcPrice("part")}}>
            </div>

            
        {:else}

            <div class="form-label">
                <label for="organiser-price" class="organiser-price">
                    Szervezői ár
                </label>
                <input type="number" name="organiser-price" required bind:value={data.organiserPrice} onchange={() => {calcPercent("org")}}>
            </div>
            
            <div class="form-label">
                <label for="participant-price" class="participant-price">
                    Résztvevői ár
                </label>
                <input type="number" name="participant-price" required bind:value={data.participantPrice} onchange={() => {calcPercent("part")}}>
            </div>

        {/if}

        <div class="form-label">
            <label for="barcode" class="barcode">
                Vonalkód
            </label>
            <input type="text" name="barcode" required bind:value={data.barcode}>
        </div>

        <div class="submit-buttons">
            <button type="reset" class="cancel" onclick={() => {showOverlay = false}}>Mégsem</button>
            <button type="submit" class="submit">Termék hozzáadása</button>
        </div>

    </form>

</div>