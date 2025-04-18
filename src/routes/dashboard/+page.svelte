<script>
    import NoteSelectionTable from "../noteSelectionTable.svelte";
</script>

<!-- TODO BIG reactivity -->
 <!-- TODO taken out resz -->
<main>

    <h1>Irányítópult</h1>

    <section>
        <h2>Statisztika</h2>

        <table>
           <caption>Pénz</caption>
           <tbody>
               <tr>
                   <td>Szervezői bevétel</td>
                   <td></td>
               </tr>
               <tr>
                   <td>Résztvevői bevétel</td>
                   <td></td>
               </tr>
               <tr>
                   <td>Összes bevétel</td>
                   <td></td>
               </tr>
               <tr>
                   <td>Beszerzési ár</td>
                   <td></td>
               </tr>
               <tr>
                   <td>ELÁBÉ</td>
                   <td></td>
               </tr>
               <tr>
                   <td>Profit</td>
                   <td></td>
               </tr>
           </tbody>
        </table>
        <table>
            <caption>Raktár</caption>
           <tbody>
               <tr>
                   <td>Összes termék</td>
                   <td></td>
               </tr>
               <tr>
                   <td>Raktárban</td>
                   <td></td>
               </tr>
               <tr>
                   <td>Szervezőnek eladott</td>
                   <td></td>
               </tr>
               <tr>
                   <td>Résztvevőnek eladott</td>
                   <td></td>
               </tr>
               <tr>
                   <td>Összes eladott termék</td>
                   <td></td>
               </tr>
           </tbody>
        </table>
   </section>

   <section>
    <h2>Beállítások</h2>
    <NoteSelectionTable></NoteSelectionTable>
   </section>

   <section>
    <h2>Események</h2>
    <ul>
        <!-- TODO Ide majd jön egy each block -->
        <!-- TODO reactivity -->
        <li>Új <strong>Chips cheetos pizzás</strong> lett ealdva <em>21:12</em>-kor</li>
     </ul>
   </section>

</main>