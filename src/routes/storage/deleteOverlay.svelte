<script lang="ts">
	import { enhance } from "$app/forms";
    import { Product } from "$lib/siteObjects.svelte"
    import { page } from "$app/state"

    let {
            product,
            products = $bindable(),
            toast = $bindable()
        } = $props()

    $effect(() => {
        if (!page.form) return
        if(page.form?.success) {
            handleSubmit()
        } else if (!page.form?.success){
            toast.show = true
            toast.text = "A termék törlése nem sikerült!"
            toast.time = 3000
        }
    })


    const handleSubmit = (): void => {

        products.splice(products.indexOf(product), 1)
        
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