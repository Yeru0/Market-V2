<script lang="ts">
	import EventOverlay from "./EventOverlay.svelte";


    let {
        basket
    } = $props()

</script>

{#each basket.events as event}
    <button onclick={() => { basket.overlay = !basket.overlay }}>Bezárás</button>
    <EventOverlay {event}></EventOverlay>
{/each}
