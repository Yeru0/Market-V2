<script lang="ts">

    let {
        sum = $bindable(),
        notes = $bindable({})
    } = $props()
    let control: boolean = false

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

    let notesKeys: string[] = Object.keys(notes)

    const increment = (note: string): void => {
        notes[parseInt(note)] += 1
        sum = Object.entries(notes).reduce((a, [note,amount]) => a + parseInt(note)*amount, 0)
    }

    const decrement = (note: string): void => {
        if (notes[parseInt(note)] <= 0) return
        if (control) notes[parseInt(note)] = 0
        else notes[parseInt(note)] -= 1

        sum = Object.entries(notes).reduce((a, [note,amount]) => a + parseInt(note)*amount, 0)
    }


</script>

<svelte:window 
    onkeydown={(e) => { 
        if (e.key == "Control") control = true
     }}
    onkeyup={(e) => { 
        if (e.key == "Control") control = false
     }}
/>

<table>
    <tbody>
        {#each notesKeys as note}
        <tr>
            <td><button onclick={() => { increment(note) }}>{note} Ft</button></td>
            <td><button onclick={() => { decrement(note) }}>{notes[parseInt(note)]}</button></td>
        </tr>
        {/each}
    </tbody>
</table>