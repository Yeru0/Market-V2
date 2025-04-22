<script lang="ts">
    import AddOverlay from "./addOverlay.svelte";
    import UpdateOverlay from "./updateOverlay.svelte";
    import DeleteOverlay from "./deleteOverlay.svelte";
	import { Product } from "$lib/siteObjects.svelte";

    let { data } = $props()

    //Render products
    let products: Product[] = $state([])

    for (const product of data.products) {
        products.push(new Product(product))
    }

    products.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    })
</script>

<svelte:head>
    <title>Market-V2: Raktár</title>
</svelte:head>

<!-- TODO BIG reactivity -->
<main>

    <h1>Áruk</h1>

    {#each products as product}

        <section>    

        <h2>{product.name}</h2>

        <div class="top-stats">
            <div class="purchased stat-card">
                <h3>Beszerzett</h3>
                <p>{product.purchasedN} db</p>
            </div>
            <div class="purchased-price stat-card">
                <h3>Beszerzési ár</h3>
                <p>{product.purchasePriceM} Ft</p>
            </div>
            <div class="single-purchased-price stat-card">
                <h3>Beszerzési egységár</h3>
                <p>{product.singleProductValueM} Ft</p>
            </div>
            <div class="stored stat-card">
                <h3>Raktározva</h3>
                <p>{product.allRemainingN} db</p>
            </div>
            <div class="profit stat-card">
                <h3>Profit</h3>
                <p>{product.allProfitM} Ft</p>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Szervező</th>
                    <th>Résztvevő</th>
                    <th>Összes</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <th>Eladott</th>
                        <td>{product.soldToOrgN} db</td>
                        <td>{product.soldToPartN} db</td>
                        <td>{product.allSoldN} db</td>
                    </tr>
                    <tr>
                        <th>Egységár</th>
                        <td>{product.singleOrgPriceM} Ft</td>
                        <td>{product.singlePartPriceM} Ft</td>
                        <td>{product.singleProductValueM} Ft</td>
                    </tr>
                    <tr>
                        <th>Egységprofit</th>
                        <td>{product.singleOrgProfitM} Ft</td>
                        <td>{product.singlePartProfitM} Ft</td>
                        <td>- Ft</td>
                    </tr>
                    <tr>
                        <!-- Eladott áruk beszerzési értéke, eladott * egység beszerár -->
                        <th>ELÁBÉ</th>
                        <td>{product.valueOfSoldProductsOrgM} Ft</td>
                        <td>{product.valueOfSoldProductsPartM} Ft</td>
                        <td>{product.valueOfSoldProductsM} Ft</td>
                    </tr>
                    <tr>
                        <th>Bevétel</th>
                        <td>{product.allOrgIncomeM} Ft</td>
                        <td>{product.allPartIncomeM} Ft</td>
                        <td>{product.allIncomeM} Ft</td>
                    </tr>
            </tbody>
        </table>    
        </section>

        <AddOverlay {product}></AddOverlay>
        <UpdateOverlay {product}></UpdateOverlay>
        <DeleteOverlay {product}></DeleteOverlay>

    {/each}

</main>

