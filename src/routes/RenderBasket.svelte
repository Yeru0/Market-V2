<script lang="ts">
    import { priceListStateSellingToOrg } from "$lib/shared.svelte";

    let {
        basket = $bindable(),
        control
    } = $props()

    priceListStateSellingToOrg.subscribe((value) => {
        for (const prod of basket.products) {            
            switch (value) {
                case true:
                    prod.price = "org"
                    break
                case false:
                    prod.price = "part"
                    break
            }
        }
    })

</script>


<style>

    table tbody tr td.amt {
        grid-template-columns: repeat(3, auto);
        grid-template-rows: auto;
        width: fit-content;
        place-self: center;
    }

    .add {
        margin-left: var(--n-s);
    }
    .remove {
        margin-right: var(--n-s);
    }




</style>

<table>
    <thead>
        <tr>
            <th>Terméknév</th>
            <th>Mennyiség</th>
            <th>Ár</th>
            <th>Akció</th>
        </tr>
    </thead>
    <tbody>

        {#each basket.products as basketProduct (basketProduct)}
            <tr>
                <td >{basketProduct.prod.name}</td>
                <td class="button amt">
                    <button
                        class="remove"
                        onclick={() => { basket.removeFromBasket(basketProduct.prod, basketProduct.price, false, control) }}
                        type="button"
                    >-</button>
                    <input type="number" bind:value={basketProduct.amt} min="1" max={basketProduct.prod.allRemainingN} required onchange={() => { basket.calcFinalPrice() }}/>
                    <button
                        class="add"
                        onclick={() => { basket.addToBasket(basketProduct.prod, basketProduct.price, control) }}
                        disabled={!basketProduct.prod.canAddMore}
                        type="button"
                    >+</button>
                    </td>
                    {#if $priceListStateSellingToOrg}
                        <td class="center">{basketProduct.prod.singleOrgPriceM} Ft</td>
                    {:else}
                        <td class="center">{basketProduct.prod.singlePartPriceM} Ft</td>
                    {/if}
                    <td class="button action">
                    <button 
                        type="button"
                        onclick={() => {basket.removeFromBasket(basketProduct.prod, basketProduct.price, true)}}
                    >Törlés</button></td>
                </tr> 
        {/each}

    </tbody>
</table>