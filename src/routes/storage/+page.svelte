<script lang="ts">
	import AddOverlay from './AddOverlay.svelte';
	import { Product } from '$lib/siteObjects.svelte';
	import RenderProds from './RenderProds.svelte';
	import Toast from '../Toast.svelte';
	import { orderStorage } from '$lib/siteMethods';

	let { data } = $props();

	//Render products
	let products: Product[] = $state([]);
	let add: boolean = $state(false); // Show add overlay
	let toast = $state({
		show: false,
		time: 1000,
		text: ''
	});

	for (const product of data.products) {
		// svelte-ignore state_referenced_locally
		products.push(new Product(product));
		// svelte-ignore state_referenced_locally
		products = orderStorage(products);
	}
</script>

<svelte:head>
	<title>Market: Raktár</title>
</svelte:head>

<main>
	{#if toast.show}
		<Toast text={toast.text} bind:show={toast.show} time={toast.time}></Toast>
	{/if}

	<div class="head">
		<h1>Áruk</h1>
		<button
			onclick={() => {
				add = true;
			}}
			class="add">Áru hozzáadása</button
		>

		{#if add}
			<div class="overlay-background">
				<button
					onclick={() => {
						add = false;
					}}
					class="overlay-background-close"
					aria-label="close overlay"
				></button>
				<AddOverlay bind:products bind:toast bind:showOverlay={add}></AddOverlay>
			</div>
		{/if}
	</div>

	{#if products.length !== 0}
		{#each products as product}
			<section>
				<RenderProds bind:products {product} bind:toast></RenderProds>
			</section>
		{/each}
	{:else}
		<section class="empty-product-list">
			<img src="/icons/shopping_cart_off.svg" alt="shopping_cart_off" />
			<h4>Nincsenek termékek raktáron</h4>
		</section>
	{/if}
</main>

<style>
	.overlay-background {
		display: grid;
		place-content: center;
	}

	.head {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, auto);
		grid-template-rows: auto;
		grid-template-areas: 'title button';

		& h1 {
			grid-area: title;
		}

		& .add {
			grid-area: button;
			width: fit-content;
			height: fit-content;
			justify-self: end;
			align-self: center;
		}
	}
</style>
