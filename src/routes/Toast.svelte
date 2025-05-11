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
        transform: translate(-50%, 0);
        background-color: var(--c-g-scale-t1a);

        display: grid;
        place-items: center;
        grid-template-columns: auto fit-content;
        grid-template-rows: repeat(2, auto);
        grid-template-areas:
        "text button"
        "progress progress";

        & .text {
            grid-area: text;
            color: var(--c-default-t1);
            font-weight: bolds;
        }

        & button {
            grid-area: button;
            width: min-content;
            height: min-content;
        }

        & progress {
            grid-area: progress;
        }
    }


</style>

<section class="toast">

    <h4 class="text">{text}</h4>

    <button onclick={() => { show = false }}>
        <span class="material-symbols-outlined">
            close
        </span>
    </button>
    
    <progress id="file" value="{progress}" max="100">{progress.toFixed(0)}</progress>

</section>
