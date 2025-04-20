<script lang="ts">
    import { priceListStateSellingToOrg } from "$lib/shared.svelte";

    let { basket, control } = $props()

</script>

<table>
    <thead>
        <tr>
            <th>Mennyiség</th>
            <th>Terméknév</th>
            <th>Ár</th>
            <th>Akció</th>
        </tr>
    </thead>
    <tbody>

        {#each basket.products as basketProduct (basketProduct)}
            <tr>
                <td>
                    <button
                        onclick={() => { basket.removeFromBasket(basketProduct.prod, basketProduct.price, false, control) }}
                        type="button"
                    >-</button>
                    <input type="number" bind:value={basketProduct.amt} min="1" max={basketProduct.prod.allRemainingN} required />
                    <button
                        onclick={() => { basket.addToBasket(basketProduct.prod, basketProduct.price, control) }}
                        disabled={!basketProduct.prod.canAddMore}
                        type="button"
                    >+</button>
                    </td>
                    <td>{basketProduct.prod.name}</td>
                    {#if $priceListStateSellingToOrg}
                        <td>{basketProduct.prod.singleOrgPriceM} Ft</td>
                    {:else}
                        <td>{basketProduct.prod.singlePartPriceM} Ft</td>
                    {/if}
                    <td><button 
                        type="button"
                        onclick={() => {basket.removeFromBasket(basketProduct.prod, basketProduct.price, true)}}>Törlés</button></td>
                </tr> 
        {/each}

    </tbody>
</table>