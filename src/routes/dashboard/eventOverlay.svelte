<script lang="ts">
	import type { Product } from "$lib/siteObjects.svelte";
	import NoteDisplayTable from "./NoteDisplayTable.svelte";

    let { event } = $props()
    
    let productB: Product = event.productB
    let productA: Product = event.productA

</script>


<h3>{productB.name}</h3>
<p> {event.time}:{event.seconds} </p>
<p>Összesen beszerzett: {productB.purchasedN}</p>
<p>Eladva: {event.soldTo == "org" ? "Szervezőnek" : event.soldTo == "part" ? "Résztvevőnek" : "Kivett"}</p>
<p>Eladott mennyiség: {productB.allRemainingN - productA.allRemainingN}</p>

<table>
    <tbody>
        <tr>
            <th>Egység beszer. ár:</th>
            <td>{productB.singleProductValueM} Ft</td>
            <th>Szerveői egység ár eladáskor:</th>
            <td>{productB.singleOrgPriceM} Ft</td>
            <th>Szervezői haszonkulcs eladáskor:</th>
            <td>{productB.organiserProfitMargin}%</td>
        </tr>
        <tr>
            <th>Össz. beszer. ár:</th>
            <td>{productB.purchasePriceM} Ft</td>
            <th>Résztvevői egység ár eladáskor:</th>
            <td>{productB.singlePartPriceM} Ft</td>
            <th>Résztvevői haszonkulcs eladáskor:</th>
            <td>{productB.participantProfitMargin}%</td>
        </tr>
    </tbody>
</table>


<table>
    <caption>Eladás elött</caption>

    <tbody>
        <tr>
            <td>Raktárban:</td>
            <td>{productB.allRemainingN} db</td>
        </tr>
        <tr>
            <td>Szervezőnek eladott:</td>
            <td>{productB.soldToOrgN} db</td>
        </tr>
        <tr>
            <td>Résztvevőnek eladott:</td>
            <td>{productB.soldToPartN} db</td>
        </tr>
        <tr>
            <td>Kivett:</td>
            <td>{productB.takenOutN} db</td>
        </tr>
        <tr>
            <td>Összes eladott:</td>
            <td>{productB.allSoldN} db</td>
        </tr>
        <tr>
            <td>Szervezői össz. bevétel:</td>
            <td>{productB.allOrgIncomeM} Ft</td>
        </tr>
        <tr>
            <td>Résztvevői össz. bevétel:</td>
            <td>{productB.allPartIncomeM} Ft</td>
        </tr>
        <tr>
            <td>Összes bevétel:</td>
            <td>{productB.allIncomeM} Ft</td>
        </tr>
        <tr>
            <td>Profit:</td>
            <td>{productB.allProfitM} Ft</td>
        </tr>
    </tbody>
</table>

<table>
    <caption>Eladás után</caption>

    <tbody>
        <tr>
            <td>Raktárban:</td>
            <td>{productA.allRemainingN} db</td>
        </tr>
        <tr>
            <td>Szervezőnek eladott:</td>
            <td>{productA.soldToOrgN} db</td>
        </tr>
        <tr>
            <td>Résztvevőnek eladott:</td>
            <td>{productA.soldToPartN} db</td>
        </tr>
        <tr>
            <td>Kivett:</td>
            <td>{productA.takenOutN} db</td>
        </tr>
        <tr>
            <td>Összes eladott:</td>
            <td>{productA.allSoldN} db</td>
        </tr>
        <tr>
            <td>Szervezői össz. bevétel:</td>
            <td>{productA.allOrgIncomeM} Ft</td>
        </tr>
        <tr>
            <td>Résztvevői össz. bevétel:</td>
            <td>{productA.allPartIncomeM} Ft</td>
        </tr>
        <tr>
            <td>Összes bevétel:</td>
            <td>{productA.allIncomeM} Ft</td>
        </tr>
        <tr>
            <td>Profit:</td>
            <td>{productA.allProfitM} Ft</td>
        </tr>
    </tbody>
</table>

<h4>Fizető címletek</h4>
<NoteDisplayTable notes={event.notesP} displayO={false}></NoteDisplayTable>

<h4>Visszajáró címletek</h4>
<NoteDisplayTable notes={event.notesC} displayO={false}></NoteDisplayTable>
