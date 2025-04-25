<script lang="ts">
import { priceListStateSellingToOrg } from "$lib/shared.svelte";

    let { products } = $props()

</script>

<table>
    <thead>
        <tr>
            <td>Terméknév</td>
            <td>Ár</td>
        </tr>
    </thead>
    <tbody>

        {#each products as product (product)}

            {#if product.active}
                <tr>
                    <td>{product.name}</td>
                    {#if $priceListStateSellingToOrg}
                        <td>{product.singleOrgPriceM} Ft</td>
                    {:else}
                        <td>{product.singlePartPriceM} Ft</td>
                    {/if}
                </tr>
            {/if}

        {/each}

    </tbody>
</table>