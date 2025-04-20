<script lang="ts">
    import { priceListStateSellingToOrg } from "../shared.svelte";

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

        <!-- TODO show when product is inactive -->
                <tr>
                    <td>{product.name}</td>
                    {#if $priceListStateSellingToOrg}
                        <td>{product.singleOrgPriceM} Ft</td>
                    {:else}
                        <td>{product.singlePartPriceM} Ft</td>
                    {/if}
                </tr>

        {/each}

    </tbody>
</table>