<script lang="ts">
	import { priceListWebSocket } from '$lib/shared.svelte';
	import { orderStorage } from '$lib/siteMethods';
	import { Product } from '$lib/siteObjects.svelte';
	import { onDestroy, onMount } from 'svelte';
	import Toast from '../Toast.svelte';

	let { products = $bindable(), toast = $bindable(), showOverlay = $bindable() } = $props();

	// Toast
	let innerToast = $state({
		show: false,
		time: 3000,
		text: ''
	});

	let id: string = $state('');

	let data = $state({
		// svelte-ignore state_referenced_locally
		id,
		name: '',
		purchasedN: 0,
		purchasePriceM: 0,
		organiserProfitMargin: 0,
		participantProfitMargin: 0,
		singleOrgPriceM: 0,
		singlePartPriceM: 0,
		code: '',
		priceInputType: 'percent'
	});

	onMount(async () => {
		//Give a random uuid from the server
		let DBUUIDResponse = await fetch('/api/uuid', { method: 'GET' });

		const reader = DBUUIDResponse.body?.getReader();
		let done, value;

		// Read the stream until it's done
		if (reader) {
			let idWithQmark: string = '';
			while ((({ done, value } = await reader.read()), !done)) {
				let newValue = new TextDecoder().decode(value);
				idWithQmark += newValue;
			}
			for (const l of idWithQmark) {
				if (l === '"') continue;
				id += l;
			}
		}

		data.id = id;
	});

	const handleSubmit = async () => {
		try {
			if (
				data.name === '' ||
				data.purchasePriceM <= 0 ||
				data.purchasedN <= 0 ||
				data.code === ''
			) {
				innerToast.text = 'Az összes mezőt töltsd ki!';
				innerToast.show = true;
				return;
			}

			if (data.organiserProfitMargin <= 0) {
				innerToast.text = 'A szervezői árnak többnek kell lennie!';
				innerToast.show = true;
				return;
			} else if (data.participantProfitMargin <= 0) {
				innerToast.text = 'A résztvevői árnak többnek kell lennie!';
				innerToast.show = true;
				return;
			}

			data.code = data.code.substring(1); // Remove first character cause of code reading reasonss

			// Send the added product to the database
			await fetch('/api/product/add', {
				method: 'POST',
				body: JSON.stringify({
					...data
				})
			});

			products.push(
				new Product({
					id: id,
					name: data.name,
					organiserProfitMargin: data.organiserProfitMargin,
					participantProfitMargin: data.participantProfitMargin,
					soldToOrgN: 0,
					soldToPartN: 0,
					takenOutN: 0,
					purchasedN: data.purchasedN,
					purchasePriceM: data.purchasePriceM,
					code: data.code
				})
			);

			products = orderStorage(products);

			$priceListWebSocket.ws.send(
				JSON.stringify({ products: { ...products }, id: $priceListWebSocket.id })
			); // Update the price list

			showOverlay = false;

			toast = {
				time: 3000,
				text: 'Termék létrehozva!',
				show: true
			};
		} catch (err) {
			toast = {
				time: 3000,
				text: 'A termék létrehozása sikertelen volt!',
				show: true
			};
		}
	};

	const calcPrice = (to: 'org' | 'part' | 'b') => {
		switch (to) {
			case 'org':
				data.singleOrgPriceM = Math.round(
					(data.purchasePriceM / data.purchasedN / 100) * (100 + data.organiserProfitMargin)
				);
				break;
			case 'part':
				data.singlePartPriceM = Math.round(
					(data.purchasePriceM / data.purchasedN / 100) * (100 + data.participantProfitMargin)
				);
				break;
			case 'b':
				data.singlePartPriceM = Math.round(
					(data.purchasePriceM / data.purchasedN / 100) * (100 + data.participantProfitMargin)
				);
				data.singleOrgPriceM = Math.round(
					(data.purchasePriceM / data.purchasedN / 100) * (100 + data.organiserProfitMargin)
				);
				break;
		}
	};

	const calcPercent = (to: 'org' | 'part' | 'b') => {
		switch (to) {
			case 'org':
				data.organiserProfitMargin = parseFloat(
					(data.singleOrgPriceM / (data.purchasePriceM / data.purchasedN / 100) - 100).toFixed(4)
				);
				break;
			case 'part':
				data.participantProfitMargin = parseFloat(
					(data.singlePartPriceM / (data.purchasePriceM / data.purchasedN / 100) - 100).toFixed(4)
				);
				break;
			case 'b':
				data.participantProfitMargin = parseFloat(
					(data.singlePartPriceM / (data.purchasePriceM / data.purchasedN / 100) - 100).toFixed(4)
				);
				data.organiserProfitMargin = parseFloat(
					(data.singleOrgPriceM / (data.purchasePriceM / data.purchasedN / 100) - 100).toFixed(4)
				);
				break;
		}
	};

	// Hide body scrollbar
	onMount(() => {
		document.body.classList.add('noscroll');
	});
	onDestroy(() => {
		document.body.classList.remove('noscroll');
	});
</script>

<svelte:window
	onkeyup={(e) => {
		if (e.key == 'Escape') {
			showOverlay = false;
		}
	}}
/>

{#if innerToast.show}
	<Toast text={innerToast.text} bind:show={innerToast.show} time={innerToast.time}></Toast>
{/if}

<div class="inner-overlay">
	<h2>Termék hozzáadása</h2>

	<form onsubmit={handleSubmit}>
		<input type="hidden" name="product-id" id="product-id" value={id} />

		<div class="form-label radio">
			<div class="buttons">
				{#each ['percent', 'value'] as type}
					<div class="button">
						<label for={type}>
							{type == 'percent' ? 'Százalékos ár: ' : 'Számos ár: '}
						</label>
						<input
							type="radio"
							name={type}
							class={type}
							value={type}
							bind:group={data.priceInputType}
						/>
					</div>
				{/each}
			</div>
		</div>

		<div class="form-label">
			<label for="product-name" class="product-name"> Terméknév </label>
			<input type="text" name="product-name" required bind:value={data.name} />
		</div>

		<div class="form-label">
			<label for="purchased-amount" class="purchased-amount"> Beszerzett mennyiség </label>
			<input
				type="number"
				name="purchased-amount"
				required
				bind:value={data.purchasedN}
				onchange={() => {
					calcPrice('b');
					calcPercent('b');
				}}
				min="1"
			/>
		</div>

		<div class="form-label">
			<label for="purchase-price" class="purchase-price"> Beszerzési ár </label>
			<input
				type="number"
				name="purchase-price"
				required
				bind:value={data.purchasePriceM}
				onchange={() => {
					calcPercent('b');
					calcPrice('b');
				}}
				min="1"
			/>
		</div>

		{#if data.priceInputType == 'percent'}
			<div class="form-label">
				<label for="organiser-profit-margin" class="organiser-profit-margin">
					Szervezői haszonkulcs
				</label>
				<input
					type="number"
					step="0.0001"
					name="organiser-profit-margin"
					required
					bind:value={data.organiserProfitMargin}
					onchange={() => {
						calcPrice('org');
					}}
					min="1"
				/>
			</div>

			<div class="form-label">
				<label for="participant-profit-margin" class="participant-profit-margin">
					Résztvevői haszonkulcs
				</label>
				<input
					type="number"
					step="0.0001"
					name="participant-profit-margin"
					required
					bind:value={data.participantProfitMargin}
					onchange={() => {
						calcPrice('part');
					}}
					min="1"
				/>
			</div>
		{:else}
			<div class="form-label">
				<label for="organiser-price" class="organiser-price"> Szervezői ár </label>
				<input
					type="number"
					name="organiser-price"
					required
					bind:value={data.singleOrgPriceM}
					onchange={() => {
						calcPercent('org');
					}}
					min="1"
				/>
			</div>

			<div class="form-label">
				<label for="participant-price" class="participant-price"> Résztvevői ár </label>
				<input
					type="number"
					name="participant-price"
					required
					bind:value={data.singlePartPriceM}
					onchange={() => {
						calcPercent('part');
					}}
					min="1"
				/>
			</div>
		{/if}

		<div class="form-label">
			<label for="code" class="code"> Vonalkód </label>
			<input type="text" name="code" required bind:value={data.code} />
		</div>

		<div class="submit-buttons">
			<button
				type="reset"
				class="cancel"
				onclick={() => {
					showOverlay = false;
				}}>Mégsem</button
			>
			<button type="submit" class="submit">Termék hozzáadása</button>
		</div>
	</form>
</div>

<style>
	h2 {
		margin: var(--n-m) auto;
	}

	.inner-overlay {
		border-radius: var(--n-m);
		padding: var(--n-l);
		width: fit-content;
		margin: auto;
	}

	.radio {
		margin: 0;

		display: grid;
		place-content: center;
		grid-template-columns: auto;
		grid-template-rows: auto;
		grid-template-areas: 'buttons';

		& .buttons {
			grid-area: buttons;
		}
	}

	.button {
		display: grid;
		padding-bottom: var(--n-xxs);
		align-items: center;
		grid-template-columns: repeat(2, auto);
		grid-template-rows: auto;
		grid-template-areas: 'label input';

		& label {
			grid-area: label;
			padding-right: var(--n-xs);
			height: min-content;
		}
		& input {
			grid-area: input;
			justify-self: end;
		}
	}
</style>
