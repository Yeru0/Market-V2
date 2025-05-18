<script lang="ts">
	import UpdateOverlay from './UpdateOverlay.svelte';
	import DeleteOverlay from './DeleteOverlay.svelte';

	let { product, products = $bindable(), toast = $bindable() } = $props();
</script>

<div class="body" class:inactive-product={!product.active}>
	<div class="head">
		<h3>{product.name}</h3>
		<div class="top-overlays">
			<button
				onclick={() => {
					product.modOverlay = true;
				}}>Termék módosítása</button
			>
			<button
				onclick={() => {
					product.delOverlay = true;
				}}>Termék törlése</button
			>
		</div>
	</div>

	<div class="top-stats">
		<div class="profit stat-card">
			<h4>Profit</h4>
			<p class:red={product.allProfitM < 0} class:green={product.allProfitM >= 0}>
				{product.allProfitM} Ft
			</p>
		</div>
		<div class="purchased stat-card">
			<h4>Beszerzett</h4>
			<p>{product.purchasedN} db</p>
		</div>
		<div class="purchased-price stat-card">
			<h4>Beszerzési ár</h4>
			<p>{product.purchasePriceM} Ft</p>
		</div>
		<div class="single-purchased-price stat-card">
			<h4>Beszerzési egységár</h4>
			<p>{product.singleProductValueM} Ft</p>
		</div>
		<div class="stored stat-card">
			<h4>Raktározva</h4>
			<p>{product.allRemainingN} db</p>
		</div>
		<div class="to stat-card">
			<h4>Kivett</h4>
			<p>{product.takenOutN} db</p>
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
				<th class="side-head">Eladott</th>
				<td>{product.soldToOrgN} db</td>
				<td>{product.soldToPartN} db</td>
				<td>{product.allSoldN} db</td>
			</tr>
			<tr>
				<th class="side-head">Egy. ár</th>
				<td>{product.singleOrgPriceM} Ft</td>
				<td>{product.singlePartPriceM} Ft</td>
				<td>-</td>
			</tr>
			<tr>
				<th class="side-head">Egy. prof.</th>
				<td>{product.singleOrgProfitM} Ft</td>
				<td>{product.singlePartProfitM} Ft</td>
				<td>-</td>
			</tr>
			<tr>
				<th class="side-head">H. K.</th>
				<td>{product.organiserProfitMargin}%</td>
				<td>{product.participantProfitMargin}%</td>
				<td>-</td>
			</tr>
			<tr>
				<!-- Eladott áruk beszerzési értéke, eladott * egység beszerár -->
				<th class="side-head">ELÁBÉ</th>
				<td>{product.valueOfSoldProductsOrgM} Ft</td>
				<td>{product.valueOfSoldProductsPartM} Ft</td>
				<td>{product.valueOfSoldProductsM} Ft</td>
			</tr>
			<tr>
				<th class="side-head">Bevétel</th>
				<td>{product.allOrgIncomeM} Ft</td>
				<td>{product.allPartIncomeM} Ft</td>
				<td>{product.allIncomeM} Ft</td>
			</tr>
		</tbody>
	</table>

	{#if product.modOverlay}
		<div class="overlay-background">
			<button
				onclick={() => {
					product.modOverlay = false;
				}}
				class="overlay-background-close"
				aria-label="close overlay"
			></button>
			<UpdateOverlay {product} bind:toast bind:products></UpdateOverlay>
		</div>
	{/if}

	{#if product.delOverlay}
		<div class="overlay-background">
			<button
				onclick={() => {
					product.delOverlay = false;
				}}
				class="overlay-background-close"
				aria-label="close overlay"
			></button>
			<DeleteOverlay {product} bind:toast bind:products></DeleteOverlay>
		</div>
	{/if}
</div>

<style>
	.head {
		width: 100%;
		display: grid;
		padding-bottom: var(--n-l);
		align-items: center;
		grid-template-columns: repeat(2, auto);
		grid-template-rows: auto;
		grid-template-areas: 'title buttons';

		& h3 {
			grid-area: title;
			margin: 0;
		}

		& .top-overlays {
			grid-area: buttons;
			justify-self: end;
		}
	}

	.body {
		border: 2px solid var(--c-default-t1);
		border-radius: var(--n-m);
		padding: var(--n-l);
		margin-bottom: var(--n-xxl);
	}
	.top-stats {
		display: grid;
		place-content: space-evenly;
		gap: var(--n-s);

		& .profit {
			grid-area: profit;
		}
		& .purchased {
			grid-area: purchased;
		}
		& .purchased-price {
			grid-area: purchased-price;
		}
		& .single-purchased-price {
			grid-area: single-purchased-price;
		}
		& .stored {
			grid-area: stored;
		}
		& .to {
			grid-area: to;
		}
	}

	@media (min-width: 760px) {
		.top-stats {
			grid-template-columns: repeat(3, auto);
			grid-template-rows: repeat(2, auto);
			grid-template-areas:
				'profit purchased purchased-price'
				'single-purchased-price stored to';
		}
	}
	@media (min-width: 516px) and (max-width: 759px) {
		.top-stats {
			grid-template-columns: repeat(2, auto);
			grid-template-rows: repeat(3, auto);
			grid-template-areas:
				'profit purchased'
				'purchased-price single-purchased-price'
				'stored to';
		}
	}

	@media (max-width: 515px) {
		.top-stats {
			grid-template-columns: auto;
			grid-template-rows: repeat(6, auto);
			grid-template-areas:
				'profit'
				'purchased'
				'purchased-price'
				'single-purchased-price'
				'stored'
				'to';
		}
	}

	.stat-card {
		border: 2px dashed var(--c-default-t1);
		border-radius: var(--n-m);
		padding: var(--n-s);
		width: 180px;

		& h4 {
			margin: var(--n-xs) 0;
		}

		& p {
			text-align: center;
			color: var(--c-default-t1);
		}
	}

	table {
		width: auto;
		min-width: 50%;
		margin: auto;
		margin-top: var(--n-l);
	}

	td,
	th {
		width: fit-content;
		padding: var(--n-xxs);
	}
	.side-head {
		text-align: left;
	}

	.overlay-background {
		display: grid;
		place-content: center;
	}

	.inactive-product {
		border-color: var(--c-g-scale-t7a);

		& h4,
		h3,
		p,
		button {
			color: var(--c-g-scale-t7a);
		}

		& .stat-card {
			border-color: var(--c-g-scale-t7a);
		}
	}
</style>
