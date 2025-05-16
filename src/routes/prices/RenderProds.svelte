<script lang="ts">
    import { priceListStateSellingToOrg } from "$lib/shared.svelte";
	import type { Product } from "$lib/siteObjects.svelte";

    let { 
        col1,
        col2,
        col3,
        col4,
        colClass
     } = $props()

     $inspect(col1)

</script>

<style>
    div.prices {
        border-collapse: collapse;
        gap: var(--n-xxl);

        & div.col1 {
            grid-area: col1;
        }
        & div.col2 {
            grid-area: col2;
        }
        & div.col3 {
            grid-area: col3;
        }
        & div.col4 {
            grid-area: col4;
        }
    }

    div.prices div.row {
        padding: var(--n-xs);
        padding-top: var(--n-l);
        border-bottom: 2px solid var(--c-g-scale-t9a);
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-template-rows: auto;
        grid-template-areas:
        "name price";

        & .name {
            grid-area: name;
        }

        & .price {
            grid-area: price;
        }
    }

    div.prices p.price{
        text-align: right;
    }

    div.prices p {
        margin: 0
    }

    .name {
        color: var(--c-default-t1)
    }


    div.prices-col1 {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto;
        grid-template-areas: 
        "col1";
    }
    div.prices-col2 {
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-template-rows: auto;
        grid-template-areas: 
        "col1 col2";
    }
    div.prices-col3 {
        display: grid;
        grid-template-columns: repeat(3, auto);
        grid-template-rows: auto;
        grid-template-areas: 
        "col1 col2 col3";
    }
    div.prices-col4 {
        display: grid;
        grid-template-columns: repeat(4, auto);
        grid-template-rows: auto;
        grid-template-areas: 
        "col1 col2 col3 col4";
    }
</style>

{#snippet col(column: Product[])}
    {#each column as product (product.id)}

        {#if product.active}
            <div class="row">
                <p class="name">{product.name}</p>
                {#if $priceListStateSellingToOrg}
                    <p class="price">{product.singleOrgPriceM} Ft</p>
                {:else}
                    <p class="price">{product.singlePartPriceM} Ft</p>
                {/if}
            </div>
        {/if}

    {/each}
{/snippet}

<div class="prices {colClass}">

    <div class="col1">
        {@render col(col1)}
    </div>
    
    {#if col2.length > 0}
        <div class="col2">
            {@render col(col2)}
        </div>
    {/if}
    {#if col3.length > 0}
        <div class="col3">
            {@render col(col3)}
        </div>
    {/if}
    {#if col4.length > 0}
        <div class="col4">
            {@render col(col4)}
        </div>
    {/if}
</div>
