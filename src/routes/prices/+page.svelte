<script lang="ts">
	import { priceListWebSocket } from "$lib/shared.svelte";
    import { Product } from "$lib/siteObjects.svelte";
	import { onMount } from "svelte";
	import RenderProds from "./RenderProds.svelte";
	import { PUBLIC_WEBSOCKET_ADDRESS } from "$env/static/public";

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

        priceListWebSocket.set({
            ws: new WebSocket(`ws://${PUBLIC_WEBSOCKET_ADDRESS}:8083`),
            id: ""
        })

        $priceListWebSocket.ws.onmessage = ((value) => {
            let data = JSON.parse(value.data)

            if (Object.entries(data).length !== 2) return
            products = []
            
            
            for (const object in data) {
                let prod: Product = new Product(data[object].infoObject)
                products.push(prod)
            }
            
        })

    })


</script>

<svelte:head>
    <title>Market: Árlista</title>
</svelte:head>

<main>
    <h1>Árlista</h1>

    {#if products.length !== 0}
        <section>
            <RenderProds bind:products></RenderProds>
        </section>
    {:else}
        <section class="empty-product-list">
            <span class="material-symbols-outlined">
                shopping_cart_off
            </span>
            <h4>Nincsenek termékek raktáron</h4>
        </section>
    {/if}
</main>