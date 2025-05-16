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
            let prods = []
            
            
            for (const object in data) {
                let prod: Product = new Product(data[object].infoObject)
                prods.push(prod)
            }

            products = prods
            
            calculateCols()
        })

    })

    // Break price list into cols
    let col1: Product[] = $state([])
    let col2: Product[] = $state([])
    let col3: Product[] = $state([])
    let col4: Product[] = $state([])

    let fitInOneCol = 11 //The number of prods that can fit in a column

    let colClass: string = $state("")

    const calculateCols = () => {

        col1 = []
        col2 = []
        col3 = []
        col4 = []

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
    }

    calculateCols()

</script>

<svelte:head>
    <title>Market: Árlista</title>
</svelte:head>

<main>
    <h1>Árlista</h1>

    {#if products.length !== 0}
        <section>
            <RenderProds {col1} {col2} {col3} {col4} {colClass}></RenderProds>
        </section>
    {:else}
        <section class="empty-product-list">
            <img src="/icons/shopping_cart_off.svg" alt="shopping_cart_off">
            <h4>Nincsenek termékek raktáron</h4>
        </section>
    {/if}
</main>