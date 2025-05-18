<script lang="ts">
	let {
		notes = $bindable({}),
		sum = $bindable(0),
		notAllO = $bindable(false),
		displayO = true
	} = $props();

	let notesKeys: string[] = Object.keys(notes);

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

		if (sum === 0) {
			notAllO = false;
		} else {
			notAllO = true;
		}
	});
</script>

<table>
	<tbody>
		{#each notesKeys as note}
			{#if displayO}
				<tr>
					<td class="name">
						{note} Ft:
					</td>
					<td class="value">
						{notes[note]} db
					</td>
				</tr>
			{:else if !displayO && notes[note] != 0}
				<tr>
					<td class="name">
						{note} Ft:
					</td>
					<td class="value">
						{notes[note]} db
					</td>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 240px;
	}

	td {
		padding: var(--n-xs);
	}
</style>
