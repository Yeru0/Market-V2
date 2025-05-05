<script lang="ts">
	import { priceListWebSocket } from "$lib/shared.svelte";
    import { Product } from "$lib/siteObjects.svelte";
	import { onMount } from "svelte";
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

    onMount(() => {

        $priceListWebSocket.ws.onmessage = ((value) => {
            let data = JSON.parse(value.data)
            products = []

            for (const object in data) {
                products.push(new Product(data[object].infoObject))
            }
        })

    })


</script>

<svelte:head>
    <title>Market: Árlista</title>
</svelte:head>

<main>
    <h1>Árlista</h1>
    <section>
        <RenderProds {products}></RenderProds>
    </section>
</main>