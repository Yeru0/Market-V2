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
            <td>{productB.singleProductValueM}</td>
            <th>Szerveői egység ár eladáskor:</th>
            <td>{productB.singleOrgPriceM}</td>
            <th>Szervezői haszonkulcs eladáskor:</th>
            <td>{productB.organiserProfitMargin}%</td>
        </tr>
        <tr>
            <th>Össz. beszer. ár:</th>
            <td>{productB.purchasePriceM}</td>
            <th>Résztvevői egység ár eladáskor:</th>
            <td>{productB.singlePartPriceM}</td>
            <th>Résztvevői haszonkulcs eladáskor:</th>
            <td>{productB.participantProfitMargin}%</td>
        </tr>
    </tbody>
</table>


<table>
    <caption>Eladás előtt</caption>

    <tbody>
        <tr>
            <td>Raktárban:</td>
            <td>{productB.allRemainingN}</td>
        </tr>
        <tr>
            <td>Szervezőnek eladott:</td>
            <td>{productB.soldToOrgN}</td>
        </tr>
        <tr>
            <td>Résztvevőnek eladott:</td>
            <td>{productB.soldToPartN}</td>
        </tr>
        <tr>
            <td>Kivett:</td>
            <td>{productB.takenOutN}</td>
        </tr>
        <tr>
            <td>Összes eladott:</td>
            <td>{productB.allSoldN}</td>
        </tr>
        <tr>
            <td>Szervezői össz. bevétel:</td>
            <td>{productB.allOrgIncomeM}</td>
        </tr>
        <tr>
            <td>Résztvevői össz. bevétel:</td>
            <td>{productB.allPartIncomeM}</td>
        </tr>
        <tr>
            <td>Összes bevétel:</td>
            <td>{productB.allIncomeM}</td>
        </tr>
        <tr>
            <td>Profit:</td>
            <td>{productB.allProfitM}</td>
        </tr>
    </tbody>
</table>

<table>
    <caption>Eladás után</caption>

    <tbody>
        <tr>
            <td>Raktárban:</td>
            <td>{productA.allRemainingN}</td>
        </tr>
        <tr>
            <td>Szervezőnek eladott:</td>
            <td>{productA.soldToOrgN}</td>
        </tr>
        <tr>
            <td>Résztvevőnek eladott:</td>
            <td>{productA.soldToPartN}</td>
        </tr>
        <tr>
            <td>Kivett:</td>
            <td>{productA.takenOutN}</td>
        </tr>
        <tr>
            <td>Összes eladott:</td>
            <td>{productA.allSoldN}</td>
        </tr>
        <tr>
            <td>Szervezői össz. bevétel:</td>
            <td>{productA.allOrgIncomeM}</td>
        </tr>
        <tr>
            <td>Résztvevői össz. bevétel:</td>
            <td>{productA.allPartIncomeM}</td>
        </tr>
        <tr>
            <td>Összes bevétel:</td>
            <td>{productA.allIncomeM}</td>
        </tr>
        <tr>
            <td>Profit:</td>
            <td>{productA.allProfitM}</td>
        </tr>
    </tbody>
</table>

<h4>Fizető címletek</h4>
<NoteDisplayTable notes={event.notesP} displayO={false}></NoteDisplayTable>

<h4>Visszajáró címletek</h4>
<NoteDisplayTable notes={event.notesC} displayO={false}></NoteDisplayTable>
