<script lang="ts">
    import { priceListWebSocket } from "$lib/shared.svelte";
	import { onDestroy, onMount } from "svelte";

    let {
            product,
            products = $bindable(),
            toast = $bindable()
        } = $props()

    const handleSubmit = async () => {

        // Remove the product from the database
        fetch("/api/product/delete", {
            method: "POST",
            body: JSON.stringify({
                id: product.id,
            })
        }).then(() => {
            products.splice(products.indexOf(product), 1)
            $priceListWebSocket.ws.send(JSON.stringify({products: {...products}, id: $priceListWebSocket.id})) // Update the price list
            toast = {
                time: 3000,
                text: "A termék törölve!",
                show: true
            }
        }).catch(() => {
            toast = {
                time: 3000,
                text: "A termék törlése sikertelen volt",
                show: true
            }
            return
        });

        
    }

    // Hide body scrollbar
	onMount(() => {
		document.body.classList.add('noscroll');
    })
	onDestroy(() => {
		document.body.classList.remove('noscroll');
    })

</script>



<style>
    .inner-overlay {
        border-radius: var(--n-m);
		padding: var(--n-l);
        width: fit-content;
        margin: auto;
    }

    h2 {
        margin: 0;
    }

    .submit-buttons {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(2, auto);
        grid-template-rows: auto;
        grid-template-areas: 
        "cancel delete";

        & .cancel {
            grid-area: cancel;
        }

        & .submit {
            grid-area: delete;
        }
    }
</style>



<svelte:window
    onkeyup={(e) => {
        if (e.key == "Escape") {
            product.delOverlay = false
        }
    }}
/>




<div class="inner-overlay">

    <h2>Termék törlése</h2>

    <p>Biztosan törlöd a(z) {product.name} terméket?</p>

    <form onsubmit={handleSubmit}>
        <input type="hidden" name="product-id" value={product.id}>

        <div class="submit-buttons">
            <button type="reset" class="cancel" onclick={() => { product.delOverlay = false }}>Mégsem</button>
            <button type="submit" class="submit">Termék törlése</button>
        </div>
    </form>

</div>