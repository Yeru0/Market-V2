<script lang="ts">
    import AddOverlay from "./AddOverlay.svelte";
	import { Product } from "$lib/siteObjects.svelte";
	import RenderProds from "./RenderProds.svelte";

    let { data } = $props()

    //Render products
    let parsedProds: Product[] = [] // This is needed so I can add the inactive products to the end
    let products: Product[] = $state([])
    let inactiveProducts: Product[] = [] // This is needed so I can add the inactive products to the end

    for (const product of data.products) {
        // svelte-ignore state_referenced_locally
        parsedProds.push(new Product(product))
    }

    for (const product of parsedProds) {
        // svelte-ignore state_referenced_locally
        if (product.active) products.push(product)
    }

    for (const product of parsedProds) {
        // svelte-ignore state_referenced_locally
        if (!product.active) inactiveProducts.push(product)
    }

    // svelte-ignore state_referenced_locally
    products = [...products].sort((a: Product, b: Product) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {                
            return -1;
        } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
        } else {           
            return 0;
        }
    })

    // svelte-ignore state_referenced_locally
    inactiveProducts = [...inactiveProducts].sort((a: Product, b: Product) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {                
            return -1;
        } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
        } else {           
            return 0;
        }
    })
    
    // svelte-ignore state_referenced_locally
    for (const product of inactiveProducts) {
        products.push(product)
    }



</script>

<svelte:head>
    <title>Market-V2: Raktár</title>
</svelte:head>

<main>

    <h1>Áruk</h1>

    <AddOverlay bind:products></AddOverlay>

    {#each products as product}

        <section>    

            <RenderProds bind:products {product}></RenderProds>
        
        </section>

    {/each}

</main>

