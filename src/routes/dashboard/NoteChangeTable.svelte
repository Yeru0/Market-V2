<script lang="ts">
	let { notes = $bindable({}), sum = $bindable(0) } = $props();

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
	});
</script>

<table>
	<tbody>
		{#each notesKeys as note}
			<tr>
				<td>
					{note} Ft:
				</td>
				<td>
					<input
						type="number"
						name="amount-{note}"
						id="amount-{note}"
						bind:value={notes[note]}
						required
						min="0"
					/>
					<!-- Ik this ain't in a form 😪 -->
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table,
	tr,
	td,
	tbody {
		width: fit-content;
	}
</style>
