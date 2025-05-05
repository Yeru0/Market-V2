<script lang="ts">
import { priceListStateSellingToOrg } from "$lib/shared.svelte";

    let { products } = $props()

</script>

<style>
    table.prices {
        border-collapse: collapse;
    }

    table.prices tbody tr td{
        padding: var(--n-xs);
        padding-top: var(--n-l);
        border-bottom: 2px solid var(--c-g-scale-t9a);
    }

    table.prices tbody tr td.price{
        text-align: right;
    }

    .name {
        color: var(--c-default-t1)
    }
</style>

<table class="prices">
    <tbody>

        {#each products as product (product)}

            {#if product.active}
                <tr>
                    <td class="name">{product.name}</td>
                    {#if $priceListStateSellingToOrg}
                        <td class="price">{product.singleOrgPriceM} Ft</td>
                    {:else}
                        <td class="price">{product.singlePartPriceM} Ft</td>
                    {/if}
                </tr>
            {/if}

        {/each}

    </tbody>
</table>