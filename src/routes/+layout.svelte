<script lang="ts">
	import { priceListStateSellingToOrg, priceListWebSocket } from "$lib/shared.svelte";
    import { onMount } from "svelte";
    import Toast from "./Toast.svelte";
    import { page } from "$app/state"
    import "$lib/styles/layout.css"
    import "$lib/styles/global.css"


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

<svelte:head>
    <script>
        import "./global.css"
    </script>
</svelte:head>

{#if toast.show}
    <Toast text={toast.text} bind:show={toast.show} time={toast.time}></Toast>
{/if}

<nav>

    <div class="logo">
        <img src="/favicon.ico" alt="An icon showing a storefront">
        <h1>Market V2</h1>
    </div>

    <ul>
        <li><a class="{page.url.pathname == "/" ? "active" : ""}" href="/">Eladás</a></li>
        <li><a class="{page.url.pathname == "/prices" ? "active" : ""}" href="/prices">Árlista</a></li>
        <li><a class="{page.url.pathname == "/dashboard" ? "active" : ""}" href="/dashboard">Irányítópult</a></li>
        <li><a class="{page.url.pathname == "/storage" ? "active" : ""}" href="/storage">Raktár</a></li>
    </ul>

    <div class="form-label">
        <label for="sell-to">
            Szervezői árlista:
        </label>
        <input type="checkbox" name="sell-to" bind:checked={$priceListStateSellingToOrg} onclick={updatePriceStateValueBackend}>
    </div>

</nav>

{@render children()}