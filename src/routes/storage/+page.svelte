<script>
    import AddOverlay from "./addOverlay.svelte";
    import UpdateOverlay from "./updateOverlay.svelte";
    import DeleteOverlay from "./deleteOverlay.svelte";
</script>

<!-- TODO BIG reactivity -->
<main>

    <h2>Áruk</h2>
    <section>    

        <div class="top-stats">
            <div class="purchased stat-card">
                <h3>Beszerzett</h3>
                <p>12 db</p>
            </div>
            <div class="stored stat-card">
                <h3>Raktározva</h3>
                <p>3 db</p>
            </div>
            <div class="purchased-price stat-card">
                <h3>Beszerzési ár</h3>
                <p>3600 Ft</p>
            </div>
            <div class="profit stat-card">
                <!-- Bevétel - Beszerár -->
                <h3>Profit</h3>
                <p>-600 Ft</p>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Szervező</th>
                    <th>Résztvevő</th>
                    <th>Összes</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <th>Eladott</th>
                        <td>6 db</td>
                        <td>3 db</td>
                        <td>9 db</td>
                    </tr>
                    <tr>
                        <th>Egységár</th>
                        <td>350 Ft</td>
                        <td>400 Ft</td>
                        <td>300 Ft</td>
                    </tr>
                    <tr>
                        <!-- Eladott áruk beszerzési értéke -->
                        <th>ELÁBÉ</th>
                        <td>1800 Ft</td>
                        <td>900 Ft</td>
                        <td>2700 Ft</td>
                    </tr>
                    <tr>
                        <th>Bevétel</th>
                        <td>2100 Ft</td>
                        <td>1200 Ft</td>
                        <td>3300 Ft</td>
                    </tr>
            </tbody>
        </table>    
    </section>

</main>

<AddOverlay></AddOverlay>
<UpdateOverlay></UpdateOverlay>
<DeleteOverlay></DeleteOverlay>
