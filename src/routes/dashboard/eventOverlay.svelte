<script lang="ts">
	import type { Product } from '$lib/siteObjects.svelte';
	import { onMount } from 'svelte';

	let { event } = $props();

	let productB: Product = event.productB;
	let productA: Product = event.productA;
</script>

<h3>{productB.name}</h3>

<ul>
	<li class="profit">Eladás profitja: {event.profitOfSale} Ft</li>
	<li>Összesen beszerzett: {productB.purchasedN} db</li>
	<li>Eladott mennyiség: {productB.allRemainingN - productA.allRemainingN} db</li>
	<li>Raktárban: {productA.allRemainingN} db</li>
</ul>

<div class="stat-diff">
	<h4>Változás</h4>

	<table class="at-sale">
		<caption>Eladásokor</caption>

		<tbody>
			<tr>
				<td class="name">Egység beszer. ár:</td>
				<td class="value">{productB.singleProductValueM} Ft</td>
			</tr>
			<tr>
				<td class="name">Össz. beszer. ár:</td>
				<td class="value">{productB.purchasePriceM} Ft</td>
			</tr>
			<tr>
				<td class="name">Szervezői e. ár:</td>
				<td class="value">{productB.singlePartPriceM} Ft</td>
			</tr>
			<tr>
				<td class="name">Résztvevői e. ár:</td>
				<td class="value">{productB.singleOrgPriceM} Ft</td>
			</tr>
			<tr>
				<td class="name">Szervezői hk.:</td>
				<td class="value">{productB.organiserProfitMargin}%</td>
			</tr>
			<tr>
				<td class="name">Résztvevői hk.:</td>
				<td class="value">{productB.participantProfitMargin}%</td>
			</tr>
			<tr>
				<td class="name">Szervezői profit.:</td>
				<td class="value">{productB.singleOrgProfitM} Ft</td>
			</tr>
			<tr>
				<td class="name">Résztvevői profit.:</td>
				<td class="value">{productB.singlePartProfitM} Ft</td>
			</tr>
		</tbody>
	</table>

	<table class="before-sale">
		<caption>Eladás előtt</caption>

		<tbody>
			<tr>
				<td class="name">Raktárban:</td>
				<td class="value">{productB.allRemainingN} db</td>
			</tr>
			<tr>
				<td class="name">Szervezőnek eladott:</td>
				<td class="value">{productB.soldToOrgN} db</td>
			</tr>
			<tr>
				<td class="name">Résztvevőnek eladott:</td>
				<td class="value">{productB.soldToPartN} db</td>
			</tr>
			<tr>
				<td class="name">Összes eladott:</td>
				<td class="value">{productB.allSoldN} db</td>
			</tr>
			<tr>
				<td class="name">Kivett:</td>
				<td class="value">{productB.takenOutN} db</td>
			</tr>
			<tr>
				<td class="name">Szervezői össz. bevétel:</td>
				<td class="value">{productB.allOrgIncomeM} Ft</td>
			</tr>
			<tr>
				<td class="name">Résztvevői össz. bevétel:</td>
				<td class="value">{productB.allPartIncomeM} Ft</td>
			</tr>
			<tr>
				<td class="name">Összes bevétel:</td>
				<td class="value">{productB.allIncomeM} Ft</td>
			</tr>
			<tr>
				<td class="name profit">Profit:</td>
				<td class="value" class:red={productB.allProfitM < 0} class:green={productB.allProfitM >= 0}
					>{productB.allProfitM} Ft</td
				>
			</tr>
		</tbody>
	</table>

	<table class="after-sale">
		<caption>Eladás után</caption>

		<tbody>
			<tr>
				<td class="name">Raktárban:</td>
				<td class="value">{productA.allRemainingN} db</td>
			</tr>
			<tr>
				<td class="name">Szervezőnek eladott:</td>
				<td class="value">{productA.soldToOrgN} db</td>
			</tr>
			<tr>
				<td class="name">Résztvevőnek eladott:</td>
				<td class="value">{productA.soldToPartN} db</td>
			</tr>
			<tr>
				<td class="name">Összes eladott:</td>
				<td class="value">{productA.allSoldN} db</td>
			</tr>
			<tr>
				<td class="name">Kivett:</td>
				<td class="value">{productA.takenOutN} db</td>
			</tr>
			<tr>
				<td class="name">Szervezői össz. bevétel:</td>
				<td class="value">{productA.allOrgIncomeM} Ft</td>
			</tr>
			<tr>
				<td class="name">Résztvevői össz. bevétel:</td>
				<td class="value">{productA.allPartIncomeM} Ft</td>
			</tr>
			<tr>
				<td class="name">Összes bevétel:</td>
				<td class="value">{productA.allIncomeM} Ft</td>
			</tr>
			<tr>
				<td class="name profit">Profit:</td>
				<td class="value" class:red={productA.allProfitM < 0} class:green={productA.allProfitM >= 0}
					>{productA.allProfitM} Ft</td
				>
			</tr>
		</tbody>
	</table>
</div>

<style>
	div.stat-diff {
		display: grid;
		column-gap: var(--n-m);

		& h4 {
			grid-area: title;
		}

		& caption {
			color: var(--c-default-t1);
		}
	}

	@media (min-width: 516px) {
		div.stat-diff {
			grid-template-columns: repeat(3, auto);
			grid-template-rows: repeat(2, auto);
			grid-template-areas:
				'title title title'
				'at before after';
		}
	}

	@media (max-width: 515px) {
		div.stat-diff {
			grid-template-columns: auto;
			grid-template-rows: repeat(4, auto);
			grid-template-areas:
				'title'
				'at'
				'before'
				'after';
		}
	}
</style>
