<script lang="ts">
	let { sum = $bindable(), notes = $bindable({}), control, shift } = $props();

	if (Object.keys(notes).length == 0) {
		notes = {
			5: 0,
			50: 0,
			500: 0,
			5000: 0,
			10: 0,
			100: 0,
			1000: 0,
			10000: 0,
			20: 0,
			200: 0,
			2000: 0,
			20000: 0
		};
	}

	$effect(() => {
		sum = Object.entries(notes).reduce((a, [note, amount]) => a + parseInt(note) * amount, 0);
	});

	let notesKeys: string[] = Object.keys(notes);

	const increment = (note: string): void => {
		if (shift) {
			decrement(note);
			return;
		}

		notes[parseInt(note)] += 1;
		sum = Object.entries(notes).reduce((a, [note, amount]) => a + parseInt(note) * amount, 0);
	};

	const decrement = (note: string): void => {
		if (notes[parseInt(note)] <= 0) return;
		if (control) notes[parseInt(note)] = 0;
		else notes[parseInt(note)] -= 1;

		sum = Object.entries(notes).reduce((a, [note, amount]) => a + parseInt(note) * amount, 0);
	};
</script>

<table>
	<tbody>
		{#each notesKeys as note}
			<tr>
				<td class="incr"
					><button
						class={notes[parseInt(note)] >= 1 ? 'active' : ''}
						type="button"
						onclick={() => {
							increment(note);
						}}>{note} Ft</button
					></td
				>
				<td class="decr"
					><button
						class={notes[parseInt(note)] >= 1 ? 'active' : ''}
						type="button"
						onclick={() => {
							decrement(note);
						}}>{notes[parseInt(note)]}</button
					></td
				>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
	}

	table tbody tr td.decr {
		display: grid;
		place-content: center end;
	}

	button.active {
		background-color: var(--c-highlight);
		color: var(--c-default-t0);

		&:disabled {
			color: var(--c-g-scale-9a);
			background-color: var(--c-g-scale-t2a);

			&:active {
				background-color: var(--c-g-scale-t40);
			}
		}
	}
</style>
