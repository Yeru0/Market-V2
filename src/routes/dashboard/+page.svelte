<script lang="ts">
	import { Basket, Product, SellEvent, Stats } from "$lib/siteObjects.svelte";
    import NoteChangeTable from "./NoteChangeTable.svelte";
    import NoteDisplayTable from "./NoteDisplayTable.svelte";    
    
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
    let events: SellEvent[][] = $state([]) //This is a list, which stores the events, separated into baskets, which are also lists, hence the double list
    const renderEvents = async () => {
        events = []
        let DBEvents: any
        try {
            const eventsFetch = await fetch("/api/events/read");
            DBEvents = await eventsFetch.json()
        } catch (error) {
            return
        }
    
        interface sellEventList {
            [basketID: string]: SellEvent[]
        }
        let IDEvents: sellEventList = {} //This stores the event based on their basket ID
        //The ID events is needed to make the creation of events easier
        
        // Separate out the events based on which basket they were in
        for (const event of DBEvents) {
            if(!(event.basketID in IDEvents)) {
                IDEvents[event.basketID] = [new SellEvent(products, event)]
            } else {
                IDEvents[event.basketID].push(new SellEvent(products, event))
            }
        }

        // Reverse the order, because this way the new events go on top
        for (let i = Object.values(IDEvents).length - 1; i >= 0; i--) {
            events.push(Object.values(IDEvents)[i])
        }
    }
    
    


</script>
<main>

    <h1>Irányítópult</h1>

    <section>
        <h2>Statisztika</h2>

        <table>
           <caption>Pénz</caption>
           <tbody>
               <tr>
                   <td>Szervezői bevétel:</td>
                   <td>{stats.orgIncome} Ft</td>
               </tr>
               <tr>
                   <td>Résztvevői bevétel:</td>
                   <td>{stats.partIncome} Ft</td>
                </tr>
                <tr>
                    <td>Szervezői profit:</td>
                    <td>{stats.orgProfit} Ft</td>
                </tr>
               <tr>
                   <td>Résztvevői profit:</td>
                   <td>{stats.partProfit} Ft</td>
               </tr>
               <tr>
                   <td>Összes bevétel:</td>
                   <td>{stats.allIncome} Ft</td>
               </tr>
               <tr>
                   <td>Beszerzési ár:</td>
                   <td>{stats.purchasePrice} Ft</td>
               </tr>
               <tr>
                   <td>ELÁBÉ:</td>
                   <td>{stats.valueOfSoldProducts} Ft</td>
               </tr>
               <tr>
                   <td>Profit:</td>
                   <td>{stats.profit} Ft</td>
               </tr>
           </tbody>
        </table>
        <table>
            <caption>Raktár</caption>
           <tbody>
               <tr>
                   <td>Összes termék:</td>
                   <td>{stats.allProducts} db</td>
               </tr>
               <tr>
                   <td>Raktárban:</td>
                   <td>{stats.inStorage} db</td>
               </tr>
               <tr>
                   <td>Szervezőnek eladott:</td>
                   <td>{stats.soldToOrgs} db</td>
               </tr>
               <tr>
                   <td>Résztvevőnek eladott:</td>
                   <td>{stats.soldToParts} db</td>
               </tr>
               <tr>
                   <td>Összes eladott termék:</td>
                   <td>{stats.allSoldProducts} db</td>
                </tr>
                <tr>
                   <td>Kivett:</td>
                   <td>{stats.takenOut} db</td>
               </tr>
           </tbody>
        </table>
   </section>

   <section>
    <h2>Beállítások</h2>
        <p>Összesen: {noteSum} Ft</p>
        {#if input}
            <NoteChangeTable bind:notes={notes} bind:sum={noteSum}></NoteChangeTable>
            <button onclick={cancelNotes}>Mégsem</button>
        {:else}
            <NoteDisplayTable bind:notes={notes} bind:sum={noteSum}></NoteDisplayTable>
        {/if}
        <button onclick={modifyNotes}>
            {input ? "Mentés" : "Módosítás"}
        </button>

   </section>

   <section>
    <h2>Események</h2>
    {#if events.length !==0}
    <button onclick={renderEvents}>Események újratöltéses</button>
        {#each events as basket}
            <ol>
                <legend>Új kosár eladás <em>{basket[0].time}</em>-kor!</legend>
                {#each basket as event}                
                        <!-- TODO reactivity -->
                        <li><strong>{event.productA.name}</strong></li>
                {/each}
            </ol>
        {/each}
        
        {:else}

        <button onclick={renderEvents}>Események betöltése</button>

    {/if}
   </section>

</main>