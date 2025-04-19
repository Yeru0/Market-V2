<script lang="ts">
    import NoteSelectionTable from "./NoteSelectionTable.svelte";
    import RenderProds from "./RenderProds.svelte";
    import { Basket, Product } from "$lib/siteObjects.svelte"
	import { changeNotes } from "$lib/siteMethods";
	import RenderBasket from "./RenderBasket.svelte";
	import CodeReaderModule from "./CodeReaderModule.svelte";


    let { data } = $props()



    // Render products
    let products: Product[] = $state([])

    for (const product of data.products) {
        products.push(new Product(product))
    }


    // Basket
    let basket: Basket = new Basket()
    let takingOut: boolean = $state(false)
    let control: boolean = $state(false)


    $effect(() => {
  
        basket.possibleChange = true
        basket.enoughNotes = true
        changeNotes(data.notes[0], basket.payingSum - basket.finalPrice).then((change) => {
            basket.returnNotes = change
            basket.enoughNotes = true
            basket.possibleChange = true
        }).catch((err) => {
            if (err == "Not enough available notes") {
                basket.possibleChange = false
            } else if (err == "Not enough notes given") {
                basket.enoughNotes = false
            }
        })

        if(basket.products.length == 0) {
            basket.payingSum = 0 // payed notes set by the selection table
            basket.returnSum = 0 //change set by note selection table
            basket.payingNotes = {}
            basket.returnNotes = {}
        }
        
    })
        
    const sell = async () => {
        // Register product sale
        type SellingProduct = {
            id: string;
            soldToOrgN: number;
            soldToPartN: number;
            takenOutN: number;
        }
        type SellingProductList = SellingProduct[]

        let soldProducts: SellingProductList = []
        let legacyProductInfo: SellingProductList = [] // This is needed for the event registry
        let productsToRemove: { prod: Product, price: "org" | "part", amt: number; }[] = []
        for (const product of basket.products) {             

            if (product.amt > products[products.indexOf(product.prod)].allRemainingN) {
                basket.products.splice(basket.products.indexOf(product))
                return
            }

            //Push a new object to the legacy list, with the old one's properties
            legacyProductInfo.push({
                id: product.prod.id,
                soldToOrgN: product.prod.soldToOrgN,
                soldToPartN: product.prod.soldToPartN,
                takenOutN: product.prod.takenOutN
            })

            for (product.amt; product.amt > 0; product.amt--) {
                if (!takingOut) product.prod.sell(product.price)
                else product.prod.sell("to")
            }
            
            productsToRemove.push(product)

            soldProducts.push({
                id: product.prod.id,
                soldToOrgN: product.prod.soldToOrgN,
                soldToPartN: product.prod.soldToPartN,
                takenOutN: product.prod.takenOutN
            })

        }
        
        for (const prod of productsToRemove) {
            basket.products.splice(basket.products.indexOf(prod))
        } 



        // Register the state of the notes
        let notes = { ...data.notes[0] }
        for (const note in notes) {
            if(note == "id") continue
            notes[note] = parseInt(notes[note]) + basket.payingNotes[note] - basket.returnNotes[note]
        }


    
        // // Send the product sale event to the database
        // await fetch("/api/product/sell", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         soldProducts
        //     })
        // });
        // // Send the changed notes to the database
        // await fetch("/api/notes/sell", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         notes
        //     })
        // });
        // Send an events to the database
        await fetch("/api/events/sell", {
            method: "POST",
            body: JSON.stringify({
                notesP: basket.payingNotes, 
                notesC: basket.returnNotes,
                productB: legacyProductInfo,
                productA: soldProducts
            })
        });
    }

</script>

<svelte:window
    onkeydown={(e) => { 
        if (e.key == "Control") control = true
     }}
    onkeyup={(e) => { 
        if (e.key == "Control") control = false
}}/>

<CodeReaderModule {basket} {products} ></CodeReaderModule>

<main>

    <h1>Termékek</h1>

    <section class="products">
        <RenderProds {products} {basket} {control}></RenderProds>
    </section>

    {#if basket.products.length > 0}
        
        <section class="basket">
            <div class="header">
                <span class="material-symbols-outlined">
                    shopping_cart
                </span>
                <h2>Kosár</h2>
            </div>

            <form onsubmit={sell}>
                <div>

                    <RenderBasket {basket} {control}></RenderBasket>

                    <label for="taking-out">
                        {basket.products.length == 1 ? "Termék kivétele" : "Termékek kivétele"}
                        <input type="checkbox" name="taking-out" id="taking-out" bind:checked={takingOut}>
                    </label>
                    {#if takingOut}
                        <button type="submit">{basket.products.length == 1 ? "Termék kivétele" : "Termékek kivétele"}</button>
                    {/if}
                </div>

                <div>
                    {#if !takingOut}
                        <div>
                            <h3>Fizetendő</h3>
                            <p>{basket.finalPrice} Ft</p>
                            <div>
                                <h4>Fizető címlet</h4>
                                <NoteSelectionTable bind:sum={basket.payingSum} bind:notes={basket.payingNotes} {control}></NoteSelectionTable>
                                <p>{basket.payingSum} Ft</p>
                            </div>
                        </div>
                        <div>
                            <h3>Visszajáró</h3>
                            {#if basket.possibleChange && basket.enoughNotes && !takingOut}
                                <p>{basket.payingSum - basket.finalPrice} Ft</p>
                                <div>
                                    <h4>Visszajáró címlet</h4>
                                    <NoteSelectionTable bind:sum={basket.returnSum} bind:notes={basket.returnNotes} {control}></NoteSelectionTable>
                                    <p>{basket.returnSum} Ft</p>

                                    <button
                                        type="submit"
                                        disabled={
                                            (5 * Math.round((basket.payingSum - basket.finalPrice) / 5)) !== basket.returnSum &&
                                            !takingOut
                                            }
                                    >Eladás</button>

                                </div>
                            {:else if !basket.enoughNotes}    
                                <h4>A fizetett összeg még nem elég!</h4>
                            {:else if !basket.possibleChange}
                                <h4>Nem lehet visszajárót adni!</h4>
                            {/if}
                        </div>
                    {/if}
                </div>

            </form>
        </section>
        
    {/if}


</main>
