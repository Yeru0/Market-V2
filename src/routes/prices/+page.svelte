<script lang="ts">
    import { Product } from "$lib/siteObjects.svelte";
	import RenderProds from "./RenderProds.svelte";

    let { data } = $props()

    // Render products
    let products: Product[] = $state([])    

    for (const product of data.products) {
        // svelte-ignore state_referenced_locally
        products.push(new Product(product))
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


</script>

<svelte:head>
    <title>Market-V2: Árlista</title>
</svelte:head>

<main>
    <h1>Termékek</h1>
    <section>
        <RenderProds {products}></RenderProds>
    </section>
</main>