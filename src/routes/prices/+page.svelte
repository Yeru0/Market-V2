<script lang="ts">
    import { priceListStateSellingToOrg } from "../shared.svelte";
    import { Product } from "$lib/siteObjects.svelte";
	import RenderProds from "./RenderProds.svelte";

    let { data } = $props()

    // Render products
    let products: Product[] = $state([])    

    for (const product of data.products) {
        products.push(new Product(product))
    }


</script>

<main>
    <h1>Termékek</h1>
    <section>
        <RenderProds {products}></RenderProds>
    </section>
</main>