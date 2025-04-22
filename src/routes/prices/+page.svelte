<script lang="ts">
    import { Product } from "$lib/siteObjects.svelte";
	import RenderProds from "./RenderProds.svelte";

    let { data } = $props()

    // Render products
    let products: Product[] = $state([])    

    for (const product of data.products) {
        products.push(new Product(product))
    }

    products.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    })


</script>

<main>
    <h1>Termékek</h1>
    <section>
        <RenderProds {products}></RenderProds>
    </section>
</main>