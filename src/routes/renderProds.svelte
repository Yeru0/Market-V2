<script lang="ts">
    import { priceListStateSellingToOrg } from "$lib/shared.svelte";

    let { products, basket, control, shift} = $props()

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
                            onclick={() => {
                                if (shift) basket.removeFromBasket(product, "org", control)
                                else basket.addToBasket(product, "org", control)
                            }}
                            disabled={!product.canAddMore}
                            >{product.singleOrgPriceM} Ft</button></td>
                    {:else}
                        <td><button
                            onclick={() => {
                                if (shift) basket.removeFromBasket(product, "part", control)
                                else basket.addToBasket(product, "part", control)
                            }}
                            disabled={!product.canAddMore}
                            >{product.singlePartPriceM} Ft</button></td>
                    {/if}
                    <td>{product.allRemainingN}/{product.purchasedN}</td>
                    <td>{product.allSoldN}</td>
                    <td>{product.takenOutN}</td>
                </tr>
            {/if}   

        {/each}

    </tbody>
</table>