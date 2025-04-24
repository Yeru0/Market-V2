<script lang="ts">

    import UpdateOverlay from "./UpdateOverlay.svelte";
    import DeleteOverlay from "./DeleteOverlay.svelte";

    let {
        product,
        products = $bindable(),
        toast = $bindable()
    } = $props()
    
</script>


<h2>{product.name}</h2>
<div class="top-overlays">
    <button onclick={() => { product.modOverlay = !product.modOverlay }}>Termék módosítása</button>
    <button onclick={() => { product.delOverlay = !product.delOverlay }}>Termék törlése</button>
</div>

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
    <div class="stored stat-card">
        <h3>Kivett</h3>
        <p>{product.takenOutN} db</p>
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
                <th>Haszonkulcs</th>
                <td>{product.organiserProfitMargin}%</td>
                <td>{product.participantProfitMargin}%</td>
                <td>- %</td>
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


{#if product.modOverlay}
    <UpdateOverlay {product} bind:toast bind:products></UpdateOverlay>
{/if}

{#if product.delOverlay}
    <DeleteOverlay {product} bind:toast bind:products></DeleteOverlay>
{/if}