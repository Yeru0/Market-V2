<script lang="ts">
	import EventOverlay from './EventOverlay.svelte';
	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import NoteDisplayTable from './NoteDisplayTable.svelte';
	import { onMount, onDestroy } from 'svelte';

	let { basket } = $props();

	let active: Tween<number> = new Tween(0, { duration: 200, easing: cubicInOut });
	let activeIndex: number = $state(0);
	let cardHeight: number = $state(0);

	const next = () => {
		if (activeIndex > basket.events.length - 2) return;
		active.target = Math.round(active.current) + 1;
		activeIndex++;
	};

	const previous = () => {
		if (activeIndex < 1) return;
		active.target = Math.round(active.current) - 1;
		activeIndex--;
	};

	//Handle swipe
	let touchStartX: number = $state(0);
	let touchEndX: number = $state(0);
	let cardsWidth: number = $state(0);
	let diffX: number = $state(0);
	let swipeFraction = $state(0);

	const handleSwipeStart = (e: TouchEvent) => {
		touchStartX = e.touches[0].clientX;
	};

	const handleSwipeMove = (e: TouchEvent) => {
		if (!touchStartX || basket.events.length === 1) return;

		touchEndX = e.touches[0].clientX;

		diffX = touchStartX - touchEndX;

		swipeFraction = diffX / cardsWidth;

		// If on either end of the list tone down the effect of swipeFraction
		if (activeIndex == 0 && swipeFraction < 0) {
			active.target = activeIndex + swipeFraction / 4;
		} else if (activeIndex == basket.events.length - 1 && swipeFraction > 0) {
			active.target = activeIndex + swipeFraction / 4;
		} else {
			active.target = activeIndex + swipeFraction;
		}
	};

	const handleSwipeEnd = () => {
		if (swipeFraction * 100 > 30) next();
		else if (swipeFraction * 100 < -30) previous();
		active.set(activeIndex);
	};

	// All profit
	let allProfit: number = $state(0);
	let allIncome: number = $state(0);
	for (let event of basket.events) {
		allProfit += event.profitOfSale;
		allIncome += event.incomeOfSale;
	}

	// Notes
	let displayNotes: boolean = $state(true);
	let displayExchange: boolean = $state(true);

	// Hide body scrollbar
	//Ez egy meglepően unorthodox megoldás, de tetszik
	onMount(() => {
		document.body.classList.add('noscroll');
	});
	onDestroy(() => {
		document.body.classList.remove('noscroll');
	});

	// Log some ids to the console so that if I need to identify a basket I can
	onMount(() => {
		console.log('Basket ID: ', basket.events[0].basketID);
	});
</script>

<svelte:window
	onkeyup={(e) => {
		if (e.key == 'ArrowRight') {
			next();
		}
		if (e.key == 'ArrowLeft') {
			previous();
		}
		if (e.key == 'Escape') {
			basket.overlay = false;
		}
	}}
/>

<div class="inner-overlay" class:extra-padding={basket.events.length == 1}>
	<button
		onclick={() => {
			basket.overlay = !basket.overlay;
		}}
		class="close-button"
	>
		<img src="/icons/close.svg" alt="close" />
	</button>

	<div class="overlay-head">
		<h1 class="title">Kosár eladva!</h1>
		<p class="time">{basket.events[0].dateTime}:{basket.events[0].seconds}</p>
	</div>

	<ul class="data">
		<li class="profit">Eladás összprofitja: {allProfit} Ft</li>
		<li>Eladás összbevétele: {allIncome} Ft</li>
		<li>
			Eladva: {basket.events[0].soldTo == 'org'
				? 'Szervezőnek'
				: basket.events[0].soldTo == 'part'
					? 'Résztvevőnek'
					: 'Kivett'}
		</li>
	</ul>

	<div class="notes">
		{#if displayNotes}
			<div class="paying-notes">
				<h4>Fizető címletek</h4>
				<div class="body">
					<NoteDisplayTable
						notes={basket.events[0].notesP}
						displayO={false}
						bind:notAllO={displayNotes}
					></NoteDisplayTable>
				</div>
			</div>
		{/if}

		{#if displayExchange}
			<div class="exchange">
				<h4>Visszajáró címletek</h4>
				<div class="body">
					<NoteDisplayTable
						notes={basket.events[0].notesC}
						displayO={false}
						bind:notAllO={displayExchange}
					></NoteDisplayTable>
				</div>
			</div>
		{/if}
	</div>

	<div class="scroller">
		{#if basket.events.length > 1}
			<button onclick={previous} class="previous" disabled={activeIndex == 0}>
				<img src="/icons/arrow_back_ios_new.svg" alt="arrow_back_ios_new" />
			</button>
		{/if}
		<div
			class="cards"
			ontouchstart={handleSwipeStart}
			ontouchmove={handleSwipeMove}
			ontouchend={handleSwipeEnd}
			bind:clientWidth={cardsWidth}
			style="height: {cardHeight}px;"
		>
			{#each basket.events as event}
				<div
					class="card"
					style="transform: translate({-(active.current - basket.events.indexOf(event)) *
						105}%, {-basket.events.indexOf(event)}00%);"
					bind:clientHeight={cardHeight}
				>
					<EventOverlay {event}></EventOverlay>
				</div>
			{/each}
		</div>
		{#if basket.events.length > 1}
			<button onclick={next} class="next" disabled={activeIndex == basket.events.length - 1}>
				<img src="/icons/arrow_forward_ios.svg" alt="arrow_forward_ios" />
			</button>
		{/if}
	</div>
</div>

<style>
	.cards {
		overflow: hidden;
	}

	.notes {
		padding-bottom: var(--n-m);
		border-bottom: 1px solid var(--c-default-t1);
		margin: 0 var(--n-m);

		display: grid;
		place-items: center;
		grid-template-columns: repeat(2, 50%);
		grid-template-rows: auto;
		grid-template-areas: 'notes exchange';

		& .paying-notes {
			grid-area: notes;
			display: grid;
			height: 100%;
			width: 100%;
			grid-template-columns: auto;
			grid-template-rows: min-content auto;
			grid-template-areas:
				'title'
				'content';

			& h4 {
				grid-area: title;
				place-self: center;
			}

			& .body {
				grid-area: content;
				place-self: start center;
			}
		}

		& .exchange {
			grid-area: exchange;
			display: grid;
			height: 100%;
			width: 100%;
			grid-template-columns: auto;
			grid-template-rows: min-content auto;
			grid-template-areas:
				'title'
				'content';

			& h4 {
				grid-area: title;
				place-self: center;
			}

			& .body {
				grid-area: content;
				place-self: start center;
			}
		}
	}
	.scroller {
		padding: var(--n-xl) 0;
		display: grid;
		grid-template-columns: min-content auto min-content;
		grid-template-rows: auto;
		grid-template-areas: 'previous cards next';

		& button {
			height: min-content;
			place-self: center;
			display: grid;
			place-items: center;
		}

		& .previous {
			grid-area: previous;
		}
		& .cards {
			grid-area: cards;
		}
		& .next {
			grid-area: next;
		}
	}

	.overlay-head {
		margin-top: var(--n-s);
		place-self: center;
		display: grid;
		place-items: center;
		grid-template-columns: auto;
		grid-template-rows: repeat(2, auto);
		grid-template-areas:
			'title'
			'time';

		& .title {
			grid-area: title;
			margin: 0px;
		}

		& .time {
			grid-area: time;
			margin: 0px;
		}
	}

	.close-button {
		place-self: end;
		width: min-content;
		display: grid;
		place-items: center;
	}

	@media (max-height: 802px) {
		.close-button {
			margin-right: var(--n-m);
		}
	}

	.extra-padding {
		padding: var(--n-xxl);
	}
</style>
