<script lang="ts">
import { priceListStateSellingToOrg } from "$lib/shared.svelte";
	import type { Product } from "$lib/siteObjects.svelte";

    let { products } = $props()

    let col1: Product[] = []
    let col2: Product[] = []
    let col3: Product[] = []
    let col4: Product[] = []

    let fitInOneCol = 11 //The number of prods that can fit in a column

    let colClass: string = $state("")

    for (const prod of products) {
        if (products.indexOf(prod) <= fitInOneCol) col1.push(prod)
        else if (products.indexOf(prod) > fitInOneCol && products.indexOf(prod) <= 2*fitInOneCol + 1) col2.push(prod)
        else if (products.indexOf(prod) > 2*fitInOneCol && products.indexOf(prod) <= 3*fitInOneCol + 2) col3.push(prod)
        else col4.push(prod)
    }

    fitInOneCol = fitInOneCol + 1

    if (products.length <= fitInOneCol) colClass = "prices-col1"
    else if (products.length <= 2 * fitInOneCol && products.length > fitInOneCol) colClass = "prices-col2"
    else if (products.length <= 3 * fitInOneCol && products.length > 2 * fitInOneCol) colClass = "prices-col3"
    else if (products.length > 3 * fitInOneCol) colClass = "prices-col4"

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
    {#each column as product (product)}

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
