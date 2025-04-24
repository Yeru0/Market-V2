<script lang="ts">

    import { onMount, onDestroy } from "svelte";

    let {
        text,
        time,
        show = $bindable()
    } = $props()

    let progress: number = $state(0)
    let elapsed: number = $state(0)
    let intervalDuration: number = 10

    let interval: ReturnType<typeof setInterval>
    
    onMount(() => {
        progress = 0

        interval = setInterval(() => {
            elapsed += intervalDuration;
            progress = Math.min((elapsed / time) * 100, 100);
        }, intervalDuration)

        setTimeout(() => {
            show = false
            clearInterval(interval)
        }, time)
    })

    onDestroy(() => {
        clearInterval(interval)
    })

</script>

<section>

    <h2>{text}</h2>

    <progress id="file" value="{progress}" max="100">{progress.toFixed(0)}</progress>

    <button onclick={() => { show = false }}>X</button>

</section>
