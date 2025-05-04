<script lang="ts">
    import { priceListStateSellingToOrg } from "$lib/shared.svelte";
	import type { Product } from "$lib/siteObjects.svelte";

    let {
        products,
        basket,
        control,
        shift,
        toast = $bindable()
    } = $props()

    const handleClick = (to: "org" | "part", product: Product) => {
        if (shift) basket.removeFromBasket(product, to, control)
        else basket.addToBasket(product, to, control)
    }

</script>

<table>
    <thead>
        <tr>
            <td>Terméknév</td>
            <td>Ár</td>
            <td>Raktár</td>
            <td>Összesen eladott</td>
            <td>Összesen kivett</td>
        </tr>
    </thead>
    <tbody>

        {#each products as product (product)}

            {#if product.active}
                <tr>
                    <td>{product.name}</td>
                    {#if $priceListStateSellingToOrg}
                        <td><button
                            onclick={() => { handleClick("org", product) }}
                            disabled={!product.canAddMore}
                            >{product.singleOrgPriceM}</button></td>
                    {:else}
                        <td><button
                            onclick={() => { handleClick("part", product) }}
                            disabled={!product.canAddMore}
                            >{product.singlePartPriceM}</button></td>
                    {/if}
                    <td>{product.allRemainingN}/{product.purchasedN}</td>
                    <td>{product.allSoldN}</td>
                    <td>{product.takenOutN}</td>
                </tr>
            {/if}   

        {/each}

    </tbody>
</table>