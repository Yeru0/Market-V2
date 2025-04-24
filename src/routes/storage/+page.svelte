<script lang="ts">
    import AddOverlay from "./AddOverlay.svelte";
	import { Product } from "$lib/siteObjects.svelte";
	import RenderProds from "./RenderProds.svelte";
    import Toast from "../Toast.svelte";
	import { orderStorage } from "$lib/siteMethods";

    let { data } = $props()

    //Render products
    let parsedProds: Product[] = [] // This is needed so I can add the inactive products to the end
    let products: Product[] = $state([])
    let toast = $state({
        show: false,
        time: 1000,
        text: ""
    })

    for (const product of data.products) {
        // svelte-ignore state_referenced_locally
        parsedProds.push(new Product(product))
    }

    $effect(() => {
        products = orderStorage(parsedProds)
    })

</script>

<svelte:head>
    <title>Market-V2: Raktár</title>
</svelte:head>

<main>

    {#if toast.show}
        <Toast text={toast.text} bind:show={toast.show} time={toast.time}></Toast>
    {/if}

    <h1>Áruk</h1>

    <AddOverlay bind:products></AddOverlay>

    {#each products as product}

        <section>    

            <RenderProds bind:products {product} bind:toast></RenderProds>
        
        </section>

    {/each}

</main>

