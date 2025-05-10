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
    let add: boolean = $state(false) // Show add overlay
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
    <title>Market: Raktár</title>
</svelte:head>

<style>
    .overlay-background {
        display: grid;
        place-content: center;
    }

    .head {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-template-rows: auto;
        grid-template-areas:
        "title button";

        & h1 {
            grid-area: title;
        }

        & button {
            grid-area: button;
            width: fit-content;
            height: fit-content;
            justify-self: end;
            align-self: center;
        }
    }
</style>

<main>

    {#if toast.show}
        <Toast text={toast.text} bind:show={toast.show} time={toast.time}></Toast>
    {/if}

    
    <div class="head">
        <h1>Áruk</h1>
        <button onclick={() => { add = true }}>Áru hozzáadása</button>

        {#if add}
            <div class="overlay-background">
                <button onclick={() => {add = false}} class="overlay-background-close" aria-label="close overlay"></button>
                <AddOverlay bind:products bind:toast bind:showOverlay={add}></AddOverlay>
            </div>
        {/if}
    </div>

    {#each products as product}

        <section>    

            <RenderProds bind:products {product} bind:toast></RenderProds>
        
        </section>

    {/each}

</main>

