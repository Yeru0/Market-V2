<script lang="ts">

    import UpdateOverlay from "./UpdateOverlay.svelte";
    import DeleteOverlay from "./DeleteOverlay.svelte";

    let {
        product,
        products = $bindable(),
        toast = $bindable()
    } = $props()
    
</script>


<h3>{product.name}</h3>
<div class="top-overlays">
    <button onclick={() => { product.modOverlay = !product.modOverlay }}>Termék módosítása</button>
    <button onclick={() => { product.delOverlay = !product.delOverlay }}>Termék törlése</button>
</div>

<div class="top-stats">
    <div class="purchased stat-card">
        <h4>Beszerzett</h4>
        <p>{product.purchasedN}</p>
    </div>
    <div class="purchased-price stat-card">
        <h4>Beszerzési ár</h4>
        <p>{product.purchasePriceM}</p>
    </div>
    <div class="single-purchased-price stat-card">
        <h4>Beszerzési egységár</h4>
        <p>{product.singleProductValueM}</p>
    </div>
    <div class="stored stat-card">
        <h4>Raktározva</h4>
        <p>{product.allRemainingN}</p>
    </div>
    <div class="stored stat-card">
        <h4>Kivett</h4>
        <p>{product.takenOutN}</p>
    </div>
    <div class="profit stat-card">
        <h4>Profit</h4>
        <p>{product.allProfitM}</p>
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
                <td>{product.soldToOrgN}</td>
                <td>{product.soldToPartN}</td>
                <td>{product.allSoldN}</td>
            </tr>
            <tr>
                <th>Egységár</th>
                <td>{product.singleOrgPriceM}</td>
                <td>{product.singlePartPriceM}</td>
                <td>{product.singleProductValueM}</td>
            </tr>
            <tr>
                <th>Haszonkulcs</th>
                <td>{product.organiserProfitMargin}%</td>
                <td>{product.participantProfitMargin}%</td>
                <td>-</td>
            </tr>
            <tr>
                <th>Egységprofit</th>
                <td>{product.singleOrgProfitM}</td>
                <td>{product.singlePartProfitM}</td>
                <td>-</td>
            </tr>
            <tr>
                <!-- Eladott áruk beszerzési értéke, eladott * egység beszerár -->
                <th>ELÁBÉ</th>
                <td>{product.valueOfSoldProductsOrgM}</td>
                <td>{product.valueOfSoldProductsPartM}</td>
                <td>{product.valueOfSoldProductsM}</td>
            </tr>
            <tr>
                <th>Bevétel</th>
                <td>{product.allOrgIncomeM}</td>
                <td>{product.allPartIncomeM}</td>
                <td>{product.allIncomeM}</td>
            </tr>
    </tbody>
</table>    


{#if product.modOverlay}
    <UpdateOverlay {product} bind:toast bind:products></UpdateOverlay>
{/if}

{#if product.delOverlay}
    <DeleteOverlay {product} bind:toast bind:products></DeleteOverlay>
{/if}