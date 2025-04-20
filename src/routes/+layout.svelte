<script lang="ts">
	import { priceListStateSellingToOrg } from "$lib/shared.svelte";
    import { onMount } from "svelte";


    const { children } = $props()
    let websocket: WebSocket

    let shift: boolean = false


    
    onMount(() => {
        websocket = new WebSocket("ws://192.168.50.81:8082/prices")
        let priceListStateLocalStorage = localStorage.getItem("priceListStateSellingToOrg")

        switch (priceListStateLocalStorage) {
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



        websocket.onmessage = ((event) => {
            let data = JSON.parse(event.data)            
            switch(data) {
                case "true":
                    $priceListStateSellingToOrg = true
                    localStorage.setItem("priceListStateSellingToOrg", `${$priceListStateSellingToOrg}`)
                    break
                case "false":
                    $priceListStateSellingToOrg = false
                    localStorage.setItem("priceListStateSellingToOrg", `${$priceListStateSellingToOrg}`)
                    break
                }
        })
    })

    let priceStateUnsub = priceListStateSellingToOrg.subscribe((value) => {
        if(websocket && websocket.readyState === websocket.OPEN) {
            websocket.send(JSON.stringify(value))
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
        <input type="checkbox" name="sell-to" bind:checked={$priceListStateSellingToOrg}>
    </label>

</nav>

{@render children()}