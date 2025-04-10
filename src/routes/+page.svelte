<script>
    import NoteSelectionTable from "./noteSelectionTable.svelte";

</script>


<!-- TODO Az egész oldalon aktív lesz majd a keyboard input listening a vonalkódolvasás miatt -->
<main>

    <h1>Termékek</h1>

    <section class="products">
        <table>
            <thead>
                <tr>
                    <td>Teréknév</td>
                    <td>Szervezői ár</td>
                    <td>Részrvevői ár</td>
                    <td>Raktár</td>
                    <td>Összesen eladott</td>
                </tr>
            </thead>
            <tbody>
    
                <!-- TODO Ide jön majd az each block -->
                <tr>
                    <td>Chips cheetos pizzás</td>
                    <td><button>400 Ft</button></td>
                    <td><button>500 Ft</button></td>
                    <td>3/10</td>
                    <td>7</td>
                </tr>
    
            </tbody>
        </table>
    </section>

    <section class="basket">
        <div class="header">
            <!-- TODO az ikon -->
            <h2>Kosár</h2>
        </div>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Mennyiség</th>
                        <th>Terméknév</th>
                        <th>Szervezői ár</th>
                        <th>Résztvevői ár</th>
                        <th>Akció</th>
                    </tr>
                </thead>
                <tbody>

                    <!-- TODO Ide is majd egy each jön -->
                    <tr>
                        <td>
                            <button>+</button>
                            <input type="number" value="1" min="1" required >
                            <button>-</button>
                        </td>
                        <td>Chips cheetos pizzás</td>
                        <td>400 Ft</td>
                        <td>500 Ft</td>
                        <td><button>Törlés</button></td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div>
            <div>
                <h3>Fizetendő</h3>
                <!-- TODO reactive -->
                <p>400Ft</p>
                <div>
                    <h4>Fizető címlet</h4>
                    <NoteSelectionTable></NoteSelectionTable>
                    <!-- TODO reactive -->
                    <p>400 Ft</p>
                </div>
            </div>
            <div>
                <h3>Visszajáró</h3>
                <!-- TODO reactivity -->
                <p>400Ft</p>
                <div>
                    <h4>Visszajáró címlet</h4>
                    <NoteSelectionTable></NoteSelectionTable>
                    <!-- TODO reactive -->
                    <p>400 Ft</p>
                </div>
            </div>
        </div>
    </section>

</main>

