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
        show = false
        progress = 0
        elapsed = 0
        time = 0
        clearInterval(interval)
    })

</script>

<style>

    .toast {
        position: fixed;
        bottom: var(--n-m);
        left: 50%;
        gap: var(--n-s);
        transform: translate(-50%, 0);
        background-color: var(--c-g-scale-t1a);
        border-radius: var(--n-m);
        padding: var(--n-m);
        cursor: pointer;
        width: fit-content;
        z-index: 100;

        display: grid;
        place-items: center;
        grid-template-columns:  repeat(2, fit-content);
        grid-template-rows: repeat(2, auto);
        grid-template-areas:
        "text button"
        "progress progress";
    }

    .toast .text {
        min-width: max-content;
        grid-area: text;
        color: var(--c-default-t1);
        margin: 0;
    }

    .toast button {
        grid-area: button;
        width: var(--n-l);
        height: var(--n-l);
        padding: 0;
    }

    .toast progress {
        grid-area: progress;
        background-color: var(--c-g-scale-t9a);
        width: 100%;
        height: var(--n-xs);
        appearance: none;
        border-radius: 9999999px;
    }

    progress::-webkit-progress-bar {
      /* background-color: #ffea00; */
      border-radius: 9999999px;
    }
  
    progress::-webkit-progress-value {
      background-color: #ffea00;
      border-radius: 9999999px;
    }
  
    progress::-moz-progress-bar {
      background-color: #ffea00;
      border-radius: 9999999px;
    }


</style>



<svelte:window
    onkeyup={(e) => {
        if (e.key == "Escape") {
            show = false
        }
    }}
/>



<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<section class="toast" onclick={() => { show=false }} aria-roledescription="toast message, that when clicked closes">

    <h4 class="text">{text}</h4>

    <button onclick={() => { show = false }}>
        <img src="/icons/close.svg" alt="close">
    </button>
    
    <progress id="file" value="{progress}" max="100">{progress.toFixed(0)}</progress>

</section>
