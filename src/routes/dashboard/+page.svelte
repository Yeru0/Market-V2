<script lang="ts">
	import { Product, SellEvent, Stats } from "$lib/siteObjects.svelte";
    import NoteChangeTable from "./NoteChangeTable.svelte";
    import NoteDisplayTable from "./NoteDisplayTable.svelte";
    import BasketOverlay from "./BasketOverlay.svelte"
    import "$lib/styles/dashboard.css"
    
    let { data } = $props()
    let noteSum: number = $state(0)

    // Render notes
    let notes: {[key: string]: number} = $state({});

    for (const [note, amount] of Object.entries(data.notes[0] as {[key: string]: string})) {
        if(note == "id") continue
        // svelte-ignore state_referenced_locally
        notes[note] = parseInt(amount);
    }

    // Render products
    let products: Product[] = $state([])    

    for (const product of data.products) {
        products.push(new Product(product))
    }

    // Render stats
    let stats: Stats = new Stats(products)


    //Take care of notes 
    let input: boolean = $state(false)
    let modifyNotes = async () => {
        input = !input

        if (input) return

        for (let [note, amt] of Object.entries(notes)) {
            if (!amt || amt < 0) {
                notes[note] = 0
            }
        }

        // Send the changed notes to the database
        await fetch("/api/notes/sell", {
            method: "PUT",
            body: JSON.stringify({
                notes
            })
        });
    }

    let cancelNotes = async () => {
        input = !input

        for (const [note, amount] of Object.entries(data.notes[0] as {[key: string]: string})) {
            if(note == "id") continue
            // svelte-ignore state_referenced_locally
            notes[note] = parseInt(amount);
        }
    }


    //Take care of events

    let events: {
        events: SellEvent[],
        overlay: boolean
    }[] = $state([]) //This is a list, which stores the events, separated into baskets, and if the overlay is visible
    const renderEvents = async () => {
        events = []
        let DBEvents: any
        try {
            const eventsFetch = await fetch("/api/events/read");
            DBEvents = await eventsFetch.json()
        } catch (error) {
            return
        }

        interface SellEventList {
            [basketID: string]: {
                events: SellEvent[],
                overlay: boolean
            }
        }
        let IDEvents: SellEventList = $state({}) //This stores the event based on their basket ID
        //The ID events is needed to make the creation of events easier
        
        // Separate out the events based on which basket they were in
        for (const event of DBEvents) {
            if(!(event.basketID in IDEvents)) {
                IDEvents[event.basketID] = {
                    events: [new SellEvent(products, event)],
                    overlay: false
                }
            } else {
                IDEvents[event.basketID].events.push(new SellEvent(products, event))
            }
        }

        // Reverse the order, because this way the new events go on top
        for (let i = Object.values(IDEvents).length - 1; i >= 0; i--) {   
            events.push(Object.values(IDEvents)[i])
        }
    }

</script>

<svelte:head>
    <title>Market: Irányítópult</title>
</svelte:head>

<main class="dashboard">

    <h1>Irányítópult</h1>

    <section class="stats">
        <h2>Statisztika</h2>

        <table class="money">
           <caption>Pénz</caption>
           <tbody>
               <tr>
                   <td class="name">Szervezői bevétel:</td>
                   <td class="value">{stats.orgIncome} Ft</td>
               </tr>
               <tr>
                   <td class="name">Résztvevői bevétel:</td>
                   <td class="value">{stats.partIncome} Ft</td>
                </tr>
                <tr>
                    <td class="name">Szervezői profit:</td>
                    <td class="value">{stats.orgProfit} Ft</td>
                </tr>
               <tr>
                   <td class="name">Résztvevői profit:</td>
                   <td class="value">{stats.partProfit} Ft</td>
               </tr>
               <tr>
                   <td class="name">Összes bevétel:</td>
                   <td class="value">{stats.allIncome} Ft</td>
               </tr>
               <tr>
                   <td class="name">Beszerzési ár:</td>
                   <td class="value">{stats.purchasePrice} Ft</td>
               </tr>
               <tr>
                   <td class="name">ELÁBÉ:</td>
                   <td class="value">{stats.valueOfSoldProducts} Ft</td>
               </tr>
               <tr>
                   <td class="name">Profit:</td>
                   <td class="value">{stats.profit} Ft</td>
               </tr>
           </tbody>
        </table>
        <table class="storage">
            <caption>Raktár</caption>
           <tbody>
               <tr>
                   <td class="name">Összes termék:</td>
                   <td class="value">{stats.allProducts} db</td>
               </tr>
               <tr>
                   <td class="name">Raktárban:</td>
                   <td class="value">{stats.inStorage} db</td>
               </tr>
               <tr>
                   <td class="name">Szervezőnek eladott:</td>
                   <td class="value">{stats.soldToOrgs} db</td>
               </tr>
               <tr>
                   <td class="name">Résztvevőnek eladott:</td>
                   <td class="value">{stats.soldToParts} db</td>
               </tr>
               <tr>
                   <td class="name">Összes eladott termék:</td>
                   <td class="value">{stats.allSoldProducts} db</td>
                </tr>
                <tr>
                   <td class="name">Kivett:</td>
                   <td class="value">{stats.takenOut} db</td>
               </tr>
           </tbody>
        </table>
   </section>

   <section class="notes">
        <h2>Címletek</h2>
        <p class="sum">Összesen: {noteSum} Ft</p>
        <div class="buttons">
            <button class="modify" onclick={modifyNotes}>
                {input ? "Mentés" : "Módosítás"}
            </button>
            {#if input}
                <button onclick={cancelNotes}>Mégsem</button>
            {/if}
        </div>
        <div class="table">
            {#if input}
                <NoteChangeTable bind:notes={notes} bind:sum={noteSum}></NoteChangeTable>
            {:else}
                <NoteDisplayTable bind:notes={notes} bind:sum={noteSum}></NoteDisplayTable>
            {/if}
        </div>
   </section>

   <section class="sells">
        <h2>Eladások</h2>

        <div class="body">
            {#if events.length !==0}

            <button class="reload" onclick={renderEvents}>Eladások újratöltése</button>
                
            <div class="sell-list">
                    {#each events as basket}
                    <div class="sell-event">
                        <div class="head">
                            <h3>Új {basket.events[0].soldTo == "to" ? "kivett" : basket.events[0].soldTo == "org" ? "szervezőnek eladott" : "résztvevőnek eladtott" } kosár <em>{basket.events[0].time}</em>-kor!</h3>
                            <button onclick={() => { basket.overlay = !basket.overlay }}>Részletek</button>
                        </div>
                        <ol>
                            {#each basket.events as event}
                                    <li><strong>{event.productA.name}</strong></li>
                            {/each}
                        </ol>
                        {#if basket.overlay}

                            <div class="overlay-background">
                                <button onclick={() => {basket.overlay = false }} class="overlay-background-close" aria-label="close overlay"></button>
                                <BasketOverlay {basket}></BasketOverlay>
                            </div>
                        {/if}
                    </div>
                    {/each}
                </div>
            
            {:else}
            
                <button class="load" onclick={renderEvents}>Eladások betöltése</button>
            
            {/if}
        </div>

   </section>

</main>