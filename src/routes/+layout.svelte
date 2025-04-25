<script lang="ts">
	import { priceListStateSellingToOrg, priceListWebSocket } from "$lib/shared.svelte";
    import { onMount } from "svelte";
    import Toast from "./Toast.svelte";


    const { children, data } = $props()
    let priceListStateWebSocket: WebSocket

    let shift: boolean = false

    let id: string // Store the device's own websocket access 


    // Toast
    let toast = $state({
        show: false,
        time: 1000,
        text: ""
    })


    
    onMount(async () => {
        priceListStateWebSocket = new WebSocket("ws://192.168.50.81:8082/prices")
        $priceListWebSocket.ws = new WebSocket("ws://192.168.50.81:8083/prices")
        

        switch (data.state) {
            case "true":
                $priceListStateSellingToOrg = true
                break
            case "false":
                $priceListStateSellingToOrg = false
                break
        }

        priceListStateWebSocket.onmessage = (async (event) => {
            let data = JSON.parse(event.data)            
            switch(data) {
                case "true":
                    $priceListStateSellingToOrg = true
                    break
                case "false":
                    $priceListStateSellingToOrg = false
                    break
                default:
                    id = data.id
                    break
                }                
        })

        $priceListWebSocket.ws.onmessage = (async (event) => {
            let data = JSON.parse(event.data)
            $priceListWebSocket.id = data.id           
        })
    })

    let updatePriceStateValueBackend = async () => {
        
        if(priceListStateWebSocket && priceListStateWebSocket.readyState === priceListStateWebSocket.OPEN) {            
            priceListStateWebSocket.send(JSON.stringify({value: !$priceListStateSellingToOrg, id}))
        }

        try {
            await fetch("/api/price-list/state", {
                method: "PUT",
                body: JSON.stringify({
                    priceListState: `${!$priceListStateSellingToOrg}`
                })
            });

            switch ($priceListStateSellingToOrg) {
                case true:
                    toast.show = false
                    toast = {
                            time: 1000,
                            text: "Szervezői árlista!",
                            show: true
                        }
                    break
                case false:
                    toast.show = false
                    toast = {
                            time: 1000,
                            text: "Résztvevői árlista!",
                            show: true
                        }
                    break
            }

        } catch (err) {          
                toast = {
                    time: 3000,
                    text: "Árlista megváltoztatása sikertelen volt!",
                    show: true
                }
        }
    }


</script>

<svelte:window
    onkeypress={async (e) => { 
        if (e.code == "Space" && shift) {
            e.preventDefault()        
            updatePriceStateValueBackend()
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

{#if toast.show}
    <Toast text={toast.text} bind:show={toast.show} time={toast.time}></Toast>
{/if}

<nav>

    <ul>
        <li><a href="/">Eladás</a></li>
        <li><a href="/prices">Árlista</a></li>
        <li><a href="/dashboard">Irányítópult</a></li>
        <li><a href="/storage">Raktár</a></li>
    </ul>

    <label for="sell-to">
        Szervezői árlista:
        <input type="checkbox" name="sell-to" bind:checked={$priceListStateSellingToOrg} onclick={updatePriceStateValueBackend}>
    </label>

</nav>

{@render children()}