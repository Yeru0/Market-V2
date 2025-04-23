<script lang="ts">
	import { enhance } from "$app/forms";
    import { Product } from "$lib/siteObjects.svelte"
    import { page } from "$app/state"

    $effect(() => {
        if(page.form?.success) {
            handleSubmit()
        }
    })

    let {
            product,
            products = $bindable()
        } = $props()

    const handleSubmit = (): void => {

        products.splice(products.indexOf(product), 1)

        products = [...products].sort((a: Product, b: Product) => {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {                
                return -1;
            } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
            } else {           
                return 0;
            }
        })
        
    }

</script>


<div>

    <h2>Termék törlése</h2>

    <p>Biztosan törlöd a(z) {product.name} terméket?</p>

    <form method="POST" action="?/delete" use:enhance>
        <input type="hidden" name="product-id" value={product.id}>

        <div class="submit-buttons">
            <button type="submit" class="submit">Termék törlése</button>
            <button type="reset" class="cancel" onclick={() => { product.delOverlay = false }}>Mégsem</button>
        </div>
    </form>

</div>