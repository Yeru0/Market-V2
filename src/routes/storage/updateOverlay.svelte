<script lang="ts">

    import { Product } from "$lib/siteObjects.svelte"
	import { priceListWebSocket } from "$lib/shared.svelte";
	import { onDestroy, onMount } from "svelte";
	import { orderStorage } from "$lib/siteMethods";

    let {
        product,
        products = $bindable(),
        toast = $bindable()
    } = $props()

    const handleSubmit = async (formData: any) => {        


        try {


            // Send the changed product to the database
            await fetch("/api/product/update", {
                method: "POST",
                body: JSON.stringify({
                    id: product.id,
                    soldToOrgN: product.soldToOrgN,
                    soldToPartN: product.soldToPartN,
                    takenOutN: product.takenOutN,
                    ...data
                })
            });


            for (const prod of products) {
                if (prod == product) {
                    prod.name = data.name,
                    prod.organiserProfitMargin = data.organiserProfitMargin,
                    prod.participantProfitMargin = data.participantProfitMargin,
                    prod.purchasePriceM = data.purchasePriceM,
                    prod.purchasedN = data.purchasedN,
                    prod.code = data.code
                }

                prod.setProps()

            }                 

            products = orderStorage(products)
            
            $priceListWebSocket.ws.send(JSON.stringify({products: {...products}, id: $priceListWebSocket.id})) // Update the price list

            product.modOverlay = false 

            toast = {
                    time: 3000,
                    text: "A termék módosítva!",
                    show: true
                }

        } catch (err) {          
                toast = {
                    time: 3000,
                    text: "A termék módosítása sikertelen volt!",
                    show: true
                }
        }

    }

    let data = $state({
        name: product.name,
        purchasedN: product.purchasedN,
        purchasePriceM: product.purchasePriceM,
        organiserProfitMargin: product.organiserProfitMargin,
        participantProfitMargin: product.participantProfitMargin,
        singleOrgPriceM: product.singleOrgPriceM,
        singlePartPriceM: product.singlePartPriceM,
        code: product.code,
        priceInputType: "percent"
    })


    const calcPrice = (to: "org" | "part" | "b") => {
        switch (to) {
            case "org":               
                data.singleOrgPriceM = Math.round((data.purchasePriceM / data.purchasedN) / 100 * (100 + data.organiserProfitMargin));
                break
            case "part":
                data.singlePartPriceM = Math.round((data.purchasePriceM / data.purchasedN) / 100 * (100 + data.participantProfitMargin));
                break
            case "b":
                data.singlePartPriceM = Math.round((data.purchasePriceM / data.purchasedN) / 100 * (100 + data.participantProfitMargin));
                data.singleOrgPriceM = Math.round((data.purchasePriceM / data.purchasedN) / 100 * (100 + data.organiserProfitMargin));
                break
        }
    }

    const calcPercent = (to: "org" | "part" | "b") => {
        switch (to) {
            case "org":
                data.organiserProfitMargin = Math.round((data.singleOrgPriceM / ((data.purchasePriceM / data.purchasedN) / 100)) - 100)
                break
            case "part":
                data.participantProfitMargin = Math.round((data.singlePartPriceM / ((data.purchasePriceM / data.purchasedN) / 100)) - 100)
                break
            case "b":
                data.participantProfitMargin = Math.round((data.singlePartPriceM / ((data.purchasePriceM / data.purchasedN) / 100)) - 100)
                data.organiserProfitMargin = Math.round((data.singleOrgPriceM / ((data.purchasePriceM / data.purchasedN) / 100)) - 100)
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


<!-- No, I didn't just copy this from add, don't be silly -->
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
            product.modOverlay = false
        }
    }}
/>




<div class="inner-overlay">

    <h2>Termék módosítása</h2>

    <form onsubmit={handleSubmit}>

        <input type="hidden" name="product-id" id="product-id" value="{product.id}">
        <input type="hidden" name="product-sold-to-org" id="product-sold-to-org" value="{product.soldToOrgN}">
        <input type="hidden" name="product-sold-to-part" id="product-sold-to-part" value="{product.soldToPartN}">
        <input type="hidden" name="product-taken-out" id="product-taken-out" value="{product.takenOutN}">

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
            <input type="text" name="product-name" bind:value={data.name} required>
        </div>
        
        <div class="form-label">
            <label for="purchased-amount" class="purchased-amount">
                Beszerzett mennyiség
            </label>
            <input type="number" name="purchased-amount" bind:value={data.purchasedN} required onchange={() => { calcPercent("b"); calcPrice("b") }}>
        </div>

        <div class="form-label">
            <label for="purchase-price" class="purchase-price">
                Beszerzési ár
            </label>
            <input type="number" name="purchase-price" bind:value={data.purchasePriceM} required onchange={() => { calcPercent("b"); calcPrice("b") }}>
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
                <input type="number" name="organiser-price" required bind:value={data.singleOrgPriceM} onchange={() => {calcPercent("org")}}>
            </div>
            
            <div class="form-label">
                <label for="participant-price" class="participant-price">
                    Résztvevői ár
                </label>
                <input type="number" name="participant-price" required bind:value={data.singlePartPriceM} onchange={() => {calcPercent("part")}}>
            </div>

        {/if}

        <div class="form-label">
            <label for="barcode" class="barcode">
                Vonalkód
            </label>
            <input type="text" name="barcode" bind:value={data.code} required>
        </div>



        <div class="submit-buttons">
            <button type="reset" class="cancel" onclick={() => { product.modOverlay = false }}>Mégsem</button>
            <button type="submit" class="submit">Termék módosítása</button>
        </div>
    </form>

</div>
