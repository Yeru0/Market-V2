<script lang="ts">
    import NoteSelectionTable from "./noteSelectionTable.svelte";
	import { Code } from "$lib/code-reader/codeReaderObjects";
    import { Basket, Product } from "$lib/siteObjects.svelte"
	import { changeNotes } from "$lib/siteMethods";
	import { priceListStateSellingToOrg } from "./shared.svelte";

    let { data } = $props()



    // Render products
    let products: Product[] = $state([])

    for (const product of data.products) {
        products.push(new Product(product))
    }



    // Function that listens to the code reader,
    // and constructs the code from it's input
    let codeS: string = "";
    let lastKeyPressTime = 0;

    const constructCode = (e: KeyboardEvent): Promise<string> => {
        return new Promise((resolve: (value: string) => void, reject: (value: void) => void) => {
            // Only construct code if not keyboard input
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - lastKeyPressTime 
            lastKeyPressTime = currentTime;
        


            let key: string = e.key;
            if (
                key == "Shift" ||
                key == "Control" ||
                key == "AltGraph" ||
                key == "Alt" ||
                key == "CapsLock" ||
                lastKeyPressTime === 0 ||
                timeDifference > 10 ||
                key == "Meta"
            ) {
                return;
            }


            if (key != "Enter") {
                codeS += key;
            } else {
                resolve(codeS);
            }

            // Promise end
        });

        // method constructCode END
    };
    
    const addToBasketOnCode = (code: string):void => {

        for(const product of products) {

            if(!product.code) return

            if (product.code == code && !$priceListStateSellingToOrg) basket.addToBasket(product, "part")
            if (product.code == code && $priceListStateSellingToOrg) basket.addToBasket(product, "org")
        }
    }
    


    // Basket
    let basket: Basket = new Basket()

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

    const sell = () => {
        let soldProducts: {}[] = []
        for (const product of basket.products) {

            if (product.amt > products[products.indexOf(product.prod)].allRemainingN) {
                basket.products.splice(basket.products.indexOf(product))
                return
            }

            for (product.amt; product.amt > 0; product.amt--) {
                product.prod.sell(product.price)
            }
            
            basket.products.splice(basket.products.indexOf(product))

            soldProducts.push({
                id: product.prod.id,
                soldToOrgN: product.prod.soldToOrgN,
                soldToPartN: product.prod.soldToPartN,
                active: product.prod.active,
            })

        }
        
        
        fetch("/api/sell/product", {
            method: "POST",
            body: JSON.stringify({
                soldProducts
            })
        });
    }

    // TODO sell function
    // TODO register sell event
    // TODO allow sikkasztás

</script>




<!-- Code-reader listening -->
<svelte:window onkeydown={(e) => {
    constructCode(e).then((result) => {
        let code = new Code(result)
        codeS = ""
        addToBasketOnCode(code.code)
    })
}} />


<main>

    <h1>Termékek</h1>

    <section class="products">
        <table>
            <thead>
                <tr>
                    <td>Teréknév</td>
                    <td>Ár</td>
                    <td>Raktár</td>
                    <td>Összesen eladott</td>
                </tr>
            </thead>
            <tbody>
    
                {#each products as product}

                    {#if product.active}
                        <tr>
                            <!-- TODO handle mixed product prices -->
                            <td>{product.name}</td>
                            {#if $priceListStateSellingToOrg}
                                <td><button onclick={() => { basket.addToBasket(product, "org") }}>{product.singleOrgPriceM} Ft</button></td>
                            {:else}
                                <td><button onclick={() => { basket.addToBasket(product, "part") }}>{product.singlePartPriceM} Ft</button></td>
                            {/if}
                            <td>{product.allRemainingN}/{product.purchasedN}</td>
                            <td>{product.allSoldN}</td>
                        </tr>
                    {/if}   

                {/each}
    
            </tbody>
        </table>
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

                    <table>
                        <thead>
                            <tr>
                                <th>Mennyiség</th>
                                <th>Terméknév</th>
                                <th>Ár</th>
                                <th>Akció</th>
                            </tr>
                        </thead>
                        <tbody>

                            {#each basket.products as basketProduct}
                                <tr>
                                    <td>
                                            <button
                                                onclick={() => { basket.removeFromBasket(basketProduct.prod, basketProduct.price) }}
                                                type="button"
                                            >-</button>
                                            <input type="number" bind:value={basketProduct.amt} min="1" max={basketProduct.prod.allRemainingN} required />
                                            <button
                                                onclick={() => { basket.addToBasket(basketProduct.prod, basketProduct.price) }}
                                                disabled={basketProduct.amt >= basketProduct.prod.allRemainingN}
                                                type="button"
                                            >+</button>
                                        </td>
                                        <td>{basketProduct.prod.name}</td>
                                        {#if $priceListStateSellingToOrg}
                                            <td>{basketProduct.prod.singleOrgPriceM} Ft</td>
                                        {:else}
                                            <td>{basketProduct.prod.singlePartPriceM} Ft</td>
                                        {/if}
                                        <td><button onclick={() => {basket.removeFromBasket(basketProduct.prod, basketProduct.price, true)}}>Törlés</button></td>
                                    </tr>    
                            {/each}

                        </tbody>
                    </table>
                </div>

                <div>
                    <div>
                        <h3>Fizetendő</h3>
                        <p>{basket.finalPrice} Ft</p>
                        <div>
                            <h4>Fizető címlet</h4>
                            <NoteSelectionTable bind:sum={basket.payingSum} bind:notes={basket.payingNotes}></NoteSelectionTable>
                            <p>{basket.payingSum} Ft</p>
                        </div>
                    </div>
                    <div>
                        <h3>Visszajáró</h3>
                        {#if basket.possibleChange && basket.enoughNotes}
                            <p>{basket.payingSum - basket.finalPrice} Ft</p>
                            <div>
                                <h4>Visszajáró címlet</h4>
                                <NoteSelectionTable bind:sum={basket.returnSum} bind:notes={basket.returnNotes}></NoteSelectionTable>
                                <p>{basket.returnSum} Ft</p>

                                <button
                                    type="submit"
                                    disabled={
                                        (5 * Math.round((basket.payingSum - basket.finalPrice) / 5)) !== basket.returnSum}
                                >Eladás</button>

                            </div>
                        {:else if !basket.enoughNotes}    
                            <h4>A fizetett összeg még nem elég!</h4>
                        {:else if !basket.possibleChange}
                            <h4>Nem lehet visszajárót adni!</h4>
                        {/if}
                        </div>
                    </div>

            </form>
        </section>
        
    {/if}


</main>
