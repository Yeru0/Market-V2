<script lang="ts">
    import { priceListWebSocket } from "$lib/shared.svelte";

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

</script>


<div>

    <h2>Termék törlése</h2>

    <p>Biztosan törlöd a(z) {product.name} terméket?</p>

    <form onsubmit={handleSubmit}>
        <input type="hidden" name="product-id" value={product.id}>

        <div class="submit-buttons">
            <button type="submit" class="submit">Termék törlése</button>
            <button type="reset" class="cancel" onclick={() => { product.delOverlay = false }}>Mégsem</button>
        </div>
    </form>

</div>