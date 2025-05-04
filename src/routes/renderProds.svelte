<script lang="ts">
    import { priceListStateSellingToOrg } from "$lib/shared.svelte";
	import type { Product } from "$lib/siteObjects.svelte";

    let {
        products,
        basket = $bindable(),
        control,
        shift,
        toast = $bindable()
    } = $props()

    const handleClick = (to: "org" | "part", product: Product) => {        
        if (shift) basket.removeFromBasket(product, to, control)
        else basket.addToBasket(product, to, control)
    }

</script>

<style>
    button {
        width: 100%;
        text-align: left;
    }

    button.active {
        background-color: var(--c-highlight);
        color: var(--c-default-t0);

        &:disabled {
            color: var(--c-g-scale-9a);
            background-color: var(--c-g-scale-t2a);

            &:active {
                background-color: var(--c-g-scale-t40);
            }
        }
    }
</style>

<table>
    <thead>
        <tr>
            <th>Terméknév</th>
            <th>Ár</th>
            <th>Raktár</th>
            <th>Eladott</th>
            <th>Kivett</th>
        </tr>
    </thead>
    <tbody>

        {#each products as product (product)}

            {#if product.active}
                <tr>
                    {#if $priceListStateSellingToOrg}
                    <td><button
                        onclick={() => { handleClick("org", product) }}
                        disabled={!product.canAddMore}
                        class="{product.inBasket ? "active" : ""}"
                        >{product.name}</button></td>
                        <td class="center">{product.singleOrgPriceM} Ft</td>
                    {:else}
                        <td><button
                            onclick={() => { handleClick("part", product) }}
                            disabled={!product.canAddMore}
                            class="{product.inBasket ? "active" : ""}"
                            >{product.name}</button></td>
                            <td class="center">{product.singlePartPriceM} Ft</td>
                    {/if}
                    <td class="center">{product.allRemainingN}/{product.purchasedN}</td>
                    <td class="center">{product.allSoldN} db</td>
                    <td class="center">{product.takenOutN} db</td>
                </tr>
            {/if}   

        {/each}

    </tbody>
</table>