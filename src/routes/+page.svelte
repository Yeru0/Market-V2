<script lang="ts">
    import NoteSelectionTable from "./NoteSelectionTable.svelte";
    import RenderProds from "./RenderProds.svelte";
    import { Basket, Product } from "$lib/siteObjects.svelte"
	import { changeNotes } from "$lib/siteMethods";
	import RenderBasket from "./RenderBasket.svelte";
	import CodeReaderModule from "./CodeReaderModule.svelte";
	import { priceListStateSellingToOrg, priceListWebSocket } from "$lib/shared.svelte";
	import Toast from "./Toast.svelte";
    import "$lib/styles/sell.css"

    let { data } = $props()




    //Toast
    let toast = $state({
        show: false,
        time: 1000,
        text: ""
    })



    // Render products
    let products: Product[] = $state([])
    let shift: boolean = $state(false)

    if (data.products !== "Internal Error") {
        for (const product of data.products) {
            // svelte-ignore state_referenced_locally
            products.push(new Product(product))
        }
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
    


    // Basket
    let basket: Basket = $state(new Basket())
    let control: boolean = $state(false)

    priceListStateSellingToOrg.subscribe((value) => {
        switch (value) {
            case true:
                basket.basketType = "org"
                break
            case false:
                basket.basketType = "part"
                break
        }
        
        basket.calcFinalPrice()
    })


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
    
    const emptyBasket = () => {      
        basket = new Basket()
        for (const product of products) {
            product.inBasket = false
        }
    }
    
    const sell = async (takingOut: boolean) => {        

        try {

            // If selling, then invalidate if not enough notes, can't give change or the change is more than it should be
            if (
                !takingOut
            ) {
                if (
                    !basket.possibleChange ||
                    !basket.enoughNotes ||
                    (5 * Math.round((basket.payingSum - basket.finalPrice) / 5)) !== basket.returnSum
                ) return
            }


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

                product.prod.inBasket = false

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

            // Send an events to the database
            //WARNING: DO NOT CHANGE THE ORDER OF THE FETCH REQUESTS!
            await fetch("/api/events/sell", {
                method: "POST",
                body: JSON.stringify({
                    notesP: basket.payingNotes, 
                    notesC: basket.returnNotes,
                    productB: legacyProductInfo,
                    productA: soldProducts
                })
            });
            if (!takingOut) {

                // Send the changed notes to the database
                await fetch("/api/notes/sell", {
                    method: "PUT",
                    body: JSON.stringify({
                        notes
                    })
                });
                
            }
            // Send the product sale event to the database
            await fetch("/api/product/sell", {
                method: "PUT",
                body: JSON.stringify({
                    soldProducts
                })
            });
            
            $priceListWebSocket.ws.send(JSON.stringify({products: {...products}, id: $priceListWebSocket.id})) // Update the price list

            toast = {
                time: 3000,
                text: "Új kosár eladva!",
                show: true
            }

        } catch (err) {          
            toast = {
                time: 3000,
                text: "A kosár eladása sikertelen volt!",
                show: true
            }
        }

    }

</script>

<svelte:window
    onkeydown={(e) => { 
        if (e.key == "Control") control = true
        if (e.key == "Shift") shift = true
     }}
    onkeyup={(e) => { 
        if (e.key == "Control") control = false
        if (e.key == "Shift") shift = false
        if (e.key == "Escape") emptyBasket()
}}/>

<svelte:head>
    <title>Market: Eladás</title>
</svelte:head>

<CodeReaderModule {basket} {products} ></CodeReaderModule>

<main class="sell">

    {#if toast.show}
        <Toast text={toast.text} bind:show={toast.show} time={toast.time}></Toast>
    {/if}

    <h1>Termékek</h1>

    {#if products.length !== 0}
        <section class="products">
            <RenderProds {products} bind:basket {control} {shift}></RenderProds>
        </section>
    {:else}
        <section class="empty-product-list">
            <span class="material-symbols-outlined">
                shopping_cart_off
            </span>
            <h4>Nincsenek termékek raktáron</h4>
        </section>
    {/if}
    
    {#if basket.products.length > 0}
    
        <section class="basket">
            <div class="header">
                <div class="icon">
                    <span class="material-symbols-outlined">shopping_cart</span>
                    <h2>Kosár</h2>
                </div>
                <button class="et" onclick={emptyBasket}>Kosár ürítése</button>
                <button class="to" onclick={() => {sell(true)}}>{basket.products.length == 1 ? "Termék kivétele" : "Termékek kivétele"}</button>
            </div>
            <form onsubmit={() => {sell(false)}}>
                <div class="render-products">
                    <RenderBasket bind:basket {control}></RenderBasket>
                </div>
            
                <div class="notes">
                    <div class="paying">
                        <h3>Fizetendő</h3>
                        <p>{basket.finalPrice} Ft</p>
                        <h4>Fizető címlet</h4>
                        <div class="line">
                            <NoteSelectionTable bind:sum={basket.payingSum} bind:notes={basket.payingNotes} {control} {shift}></NoteSelectionTable>
                        </div>
                        <p>{basket.payingSum} Ft</p>
                    </div>
                    <div class="change">
                        <h3>Visszajáró</h3>
                        {#if basket.possibleChange && basket.enoughNotes}
                            <p>{basket.payingSum - basket.finalPrice} Ft</p>
                            <h4>Visszajáró címlet</h4>
                            <div class="line">
                                <NoteSelectionTable bind:sum={basket.returnSum} bind:notes={basket.returnNotes} {control} {shift}></NoteSelectionTable>
                            </div>
                            <p>{basket.returnSum} Ft</p>
                        {:else if !basket.enoughNotes}
                            <div class="not-enough-money">
                                <span class="material-symbols-outlined">credit_card_off</span>
                                <h4>A fizetett összeg még nem elég!</h4>
                            </div>
                        {:else if !basket.possibleChange}
                            <div class="no-change-possible">
                                <span class="material-symbols-outlined">money_off</span>
                                <h4>Nem lehet visszajárót adni!</h4>
                            </div>
                        {/if}
                    </div>
                
                    <div class="sell-btn">
                    
                        <button
                        type="submit"
                        disabled={
                            (5 * Math.round((basket.payingSum - basket.finalPrice) / 5)) !== basket.returnSum
                            }
                        >Eladás</button>
                        
                        
                    </div>
                
                </div>
            
            </form>
        </section>
        
    {/if}


</main>
