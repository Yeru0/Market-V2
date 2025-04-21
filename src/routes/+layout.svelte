<script lang="ts">
	import { priceListStateSellingToOrg } from "$lib/shared.svelte";
    import { onMount } from "svelte";


    const { children, data } = $props()
    let websocket: WebSocket

    let shift: boolean = false


    
    onMount(async () => {
        websocket = new WebSocket("ws://192.168.50.81:8082/prices")

        switch (data.state) {
            case "true":
                $priceListStateSellingToOrg = true
                break
            case "false":
                $priceListStateSellingToOrg = false
                break
        }

        websocket.onclose = (() => {
            priceStateUnsub()
        })



        websocket.onmessage = (async (event) => {
            let data = JSON.parse(event.data)            
            switch(data) {
                case "true":
                    $priceListStateSellingToOrg = true
                    break
                case "false":
                    $priceListStateSellingToOrg = false
                    break
                }
        })
    })

    let priceStateUnsub = priceListStateSellingToOrg.subscribe(async (value) => {
        if(websocket && websocket.readyState === websocket.OPEN) {            
            websocket.send(`${value}`)
        }
    })


</script>

<svelte:window
    onkeypress={(e) => { 
        if (e.code == "Space" && shift) {
            e.preventDefault()        
            priceListStateSellingToOrg.set(!$priceListStateSellingToOrg) 
        }
     }}

    onkeydown={(e) => { 
        if (e.key == "Shift") shift = true
     }}
    onkeyup={(e) => { 
        if (e.key == "Shift") shift = false
    }}
/>


<nav>

    <ul>
        <li><a href="/">Eladás</a></li>
        <li><a href="/dashboard">Irányítópult</a></li>
        <li><a href="/storage">Raktár</a></li>
        <li><a href="/prices">Árlista</a></li>
    </ul>

    <label for="sell-to">
        Szervezői árlista:
        <input type="checkbox" name="sell-to" bind:checked={$priceListStateSellingToOrg} onclick={async () => {
            await fetch("/api/price-list/state", {
                method: "PUT",
                body: JSON.stringify({
                    priceListState: `${!$priceListStateSellingToOrg}`
                })
            });
        }}>
    </label>

</nav>

{@render children()}