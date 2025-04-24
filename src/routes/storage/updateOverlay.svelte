<script lang="ts">

    import { enhance } from "$app/forms"
    import { Product } from "$lib/siteObjects.svelte"

    let {
        product,
        products = $bindable()
    } = $props()

    let data = $state({
        purchasedN: product.purchasedN,
        purchasedM: product.purchasePriceM,
        organiserProfitMargin: product.organiserProfitMargin,
        participantProfitMargin: product.participantProfitMargin,
        organiserPrice: product.singleOrgPriceM,
        participantPrice: product.singlePartPriceM,
    })

    const handleSubmit = (e: SubmitEvent): void => {
        let form = e.target as HTMLFormElement
        if (form === null) return
        let formData = new FormData(form)

        for (const prod of products) {
            if (prod == product) {
                prod.id = formData.get("product-id");
                prod.name = formData.get("product-name");
                prod.organiserProfitMargin = formData.get("organiser-profit-margin");
                prod.participantProfitMargin = formData.get("participant-profit-margin");
                prod.soldToOrgN = formData.get("product-sold-to-org");
                prod.soldToPartN = formData.get("product-sold-to-part");
                prod.takenOutN = formData.get("product-taken-out");
                prod.purchasePriceM = formData.get("purchase-price");
                prod.purchasedN = formData.get("purchased-amount");
                prod.code = formData.get("barcode");
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

    <h2>Termék módosítása</h2>

    <form method="POST" action="?/update" onsubmit={handleSubmit} use:enhance>

        <input type="hidden" name="product-id" id="product-id" value="{product.id}">
        <input type="hidden" name="product-sold-to-org" id="product-sold-to-org" value="{product.soldToOrgN}">
        <input type="hidden" name="product-sold-to-part" id="product-sold-to-part" value="{product.soldToPartN}">
        <input type="hidden" name="product-taken-out" id="product-taken-out" value="{product.takenOutN}">

        <label for="product-name" class="product-name">
            Terméknév
            <input type="text" name="product-name" value={product.name}>
        </label>
        
        <label for="purchased-amount" class="purchased-amount">
            Beszerzett mennyiség
            <input type="number" name="purchased-amount" value={product.purchasedN}>
        </label>

        <label for="purchase-price" class="purchase-price">
            Beszerzési ár
            <input type="number" name="purchase-price" value={product.purchasePriceM}> Ft
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
            <input type="number" name="barcode" value={product.code}>
        </label>



        <div class="submit-buttons">
            <button type="submit" class="submit" onclick={() => { product.modOverlay = false }}>Termék módosítása</button>
            <button type="reset" class="cancel" onclick={() => { product.modOverlay = false }}>Mégsem</button>
        </div>
    </form>

</div>