<script lang="ts">

    let {
        notes = $bindable({}),
        sum = $bindable(0)
    } = $props()
    
    let notesKeys: string[] = Object.keys(notes)
    let input = $state(false)

    if (Object.keys(notes).length == 0) {
        notes = {
            5:0,
            50:0,
            500:0,
            5000:0,
            10:0,
            100:0,
            1000:0,
            10000:0,
            20:0,
            200:0,
            2000:0,
            20000:0
        }
    }
    
    
    $effect(() => {
        sum = Object.entries(notes).reduce((a, [note,amount]) => a + parseInt(note)*amount, 0)
    })
    


    let modifyNotes = async () => {
        input = !input

        if (input) return
        // Send the changed notes to the database
        await fetch("/api/notes/sell", {
            method: "PUT",
            body: JSON.stringify({
                notes
            })
        });
    }

</script>

<table>
    <tbody>
        {#each notesKeys as note}
        <tr>
            <td>
                {#if input}
                    <label for="amount-{note}">
                        {note}:
                        <input type="number" name="amount-{note}" id="amount-{note}" bind:value={notes[note]}>
                    </label>
                {:else}
                    {note}: {notes[note]}
                {/if}
            </td>
        </tr>
        {/each}
    </tbody>
</table>

<button onclick={modifyNotes}>
    {input ? "Mentés" : "Módosítás"}
</button>
