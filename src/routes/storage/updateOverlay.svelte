<script lang="ts">

    import { Product } from "$lib/siteObjects.svelte"

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
            }                 



            products = [...products].sort((a: Product, b: Product) => {
                if (a.name.toUpperCase() < b.name.toUpperCase()) {                
                    return -1;
                } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
                    return 1;
                } else {           
                    return 0;
                }
            })

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
        code: product.code
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
                data.organiserProfitMargin = (data.singleOrgPriceM / ((data.purchasePriceM / data.purchasedN) / 100)) - 100
                break
            case "part":
                data.participantProfitMargin = (data.singlePartPriceM / ((data.purchasePriceM / data.purchasedN) / 100)) - 100
                break
            case "b":
                data.participantProfitMargin = (data.singlePartPriceM / ((data.purchasePriceM / data.purchasedN) / 100)) - 100
                data.organiserProfitMargin = (data.singleOrgPriceM / ((data.purchasePriceM / data.purchasedN) / 100)) - 100
                break
        }
    }

</script>


<div>

    <h2>Termék módosítása</h2>

    <form onsubmit={handleSubmit}>

        <input type="hidden" name="product-id" id="product-id" value="{product.id}">
        <input type="hidden" name="product-sold-to-org" id="product-sold-to-org" value="{product.soldToOrgN}">
        <input type="hidden" name="product-sold-to-part" id="product-sold-to-part" value="{product.soldToPartN}">
        <input type="hidden" name="product-taken-out" id="product-taken-out" value="{product.takenOutN}">

        <label for="product-name" class="product-name">
            Terméknév
            <input type="text" name="product-name" bind:value={data.name} required>
        </label>
        
        <label for="purchased-amount" class="purchased-amount">
            Beszerzett mennyiség
            <input type="number" name="purchased-amount" bind:value={data.purchasedN} required onchange={() => { calcPercent("b"); calcPrice("b") }}>
        </label>

        <label for="purchase-price" class="purchase-price">
            Beszerzési ár
            <input type="number" name="purchase-price" bind:value={data.purchasePriceM} required onchange={() => { calcPercent("b"); calcPrice("b") }}> Ft
        </label>

        <label for="organiser-profit-margin" class="organiser-profit-margin">
            Szervezői haszonkulcs
            <input type="number" name="organiser-profit-margin" required bind:value={data.organiserProfitMargin} onchange={() => {calcPrice("org")}}> %
        </label>

        <label for="organiser-price" class="organiser-price">
            Szervezői ár
            <input type="number" name="organiser-price" required bind:value={data.singleOrgPriceM} onchange={() => {calcPercent("org")}}> Ft
        </label>
        
        <label for="participant-profit-margin" class="participant-profit-margin">
            Résztvevői haszonkulcs
            <input type="number" name="participant-profit-margin" required bind:value={data.participantProfitMargin} onchange={() => {calcPrice("part")}}> %
        </label>

        <label for="participant-price" class="participant-price">
            Résztvevői ár
            <input type="number" name="participant-price" required bind:value={data.singlePartPriceM} onchange={() => {calcPercent("part")}}> Ft
        </label>

        <label for="barcode" class="barcode">
            Vonalkód
            <input type="text" name="barcode" bind:value={data.code} required>
        </label>



        <div class="submit-buttons">
            <button type="submit" class="submit">Termék módosítása</button>
            <button type="reset" class="cancel" onclick={() => { product.modOverlay = false }}>Mégsem</button>
        </div>
    </form>

</div>
