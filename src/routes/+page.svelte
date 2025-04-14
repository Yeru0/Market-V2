<script lang="ts">
    import NoteSelectionTable from "./noteSelectionTable.svelte";
	import { Code } from "$lib/code-reader/codeReaderObjects";
    import { Product } from "$lib/siteObjects"
	import { changeNotes } from "$lib/siteMethods";

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

    function constructCode(e: KeyboardEvent): Promise<string> {
        return new Promise((resolve: (value: string) => void, reject: (value: void) => void) => {
            e.preventDefault();

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



    // Basket
    let basket: {prod: Product, price: "org" | "part", amt: number}[] = $state([])
    let payingSum: number = $state(0)
    let returnSum: number = $state(0)
    let exchangeMoneyValue = $state(0)

    // TODO EXCHANGE NOTES

    const addToBasket = (prod: Product, price: "org" | "part"): void => {

        for (const product of basket) {
            if (product.prod == prod && product.price == price) {
                product.amt += 1
                return
            }
        }

        basket.push({prod, price, amt: 1})
        
    }

    const removeFromBasket = (prod: Product, price: "org" | "part"): void => {

        for (const product of basket) {
            if (product.prod == prod && product.price == price && product.amt > 1) {
                product.amt -= 1
                return
            }
        }

        basket.splice(basket.indexOf({prod, price, amt: 1}), 1)

    }

    const finalPrice = (): number => {
        let price: number = 0

        for (const basketElement of basket) {
            if (basketElement.price == "org") {
                price += basketElement.prod.singleOrgPriceM * basketElement.amt
            } else if (basketElement.price == "part") {
                price += basketElement.prod.singlePartPriceM * basketElement.amt
            }
        }
        
        return price
    }


</script>




<!-- Code-reader listening -->
<svelte:window onkeydown={(e) => {
    constructCode(e).then((result) => {
        let code = new Code(result)
        codeS = ""
    })
}} />


<main>

    <h1>Termékek</h1>

    <section class="products">
        <table>
            <thead>
                <tr>
                    <td>Teréknév</td>
                    <td>Szervezői ár</td>
                    <td>Részrvevői ár</td>
                    <td>Raktár</td>
                    <td>Összesen eladott</td>
                </tr>
            </thead>
            <tbody>
    
                {#each products as product}                    
                    <tr>
                        <td>{product.name}</td>
                        <td><button onclick={() => { addToBasket(product, "org") }}>{product.singleOrgPriceM} Ft</button></td>
                        <td><button onclick={() => { addToBasket(product, "part") }}>{product.singlePartPriceM} Ft</button></td>
                        <td>{product.allRemainingN}/{product.purchasedN}</td>
                        <td>{product.allSoldN}</td>
                    </tr>

                {/each}
    
            </tbody>
        </table>
    </section>

    {#if basket.length > 0}
        
        <section class="basket">
        <div class="header">
            <span class="material-symbols-outlined">
                shopping_cart
            </span>
            <h2>Kosár</h2>
        </div>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Mennyiség</th>
                        <th>Terméknév</th>
                        <th>Szervezői ár</th>
                        <th>Résztvevői ár</th>
                        <th>Akció</th>
                    </tr>
                </thead>
                <tbody>

                    {#each basket as {prod, price, amt}}

                        <tr>
                            <td>
                                <button onclick={() => { addToBasket(prod, price) }}>+</button>
                                <input type="number" value="{amt}" min="1" required >
                                <button onclick={() => { removeFromBasket(prod, price) }}>-</button>
                            </td>
                            <td>{prod.name}</td>
                            <td>{prod.singlePartPriceM} Ft</td>
                            <td>{prod.singleOrgPriceM} Ft</td>
                            <td><button onclick={() => {removeFromBasket(prod, price)}}>Törlés</button></td>
                        </tr>
                                        
                    {/each}

                </tbody>
            </table>
        </div>

        <div>
            <div>
                <h3>Fizetendő</h3>
                <p>{finalPrice()} Ft</p>
                <div>
                    <h4>Fizető címlet</h4>
                    <NoteSelectionTable bind:sum={payingSum}></NoteSelectionTable>
                    <p>{payingSum} Ft</p>
                </div>
            </div>
            <div>
                <h3>Visszajáró</h3>
                <!-- TODO reactivity -->
                <p>400 Ft</p>
                <div>
                    <h4>Visszajáró címlet</h4>
                    <NoteSelectionTable bind:sum={returnSum}></NoteSelectionTable>
                    <p>{returnSum} Ft</p>
                </div>
            </div>
        </div>
        </section>
    
    {/if}

</main>

