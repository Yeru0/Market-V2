<script>
	import NoteDisplayTable from "./NoteDisplayTable.svelte";

</script>


<h3>Terméknév</h3>
<p>Összesen beszerzett: </p>
<p>Eladva: </p>
<p>Mennyiség: </p>

<table>
    <tbody>
        <tr>
            <th>Egység beszer. ár</th>
            <td></td>
            <th>Szerveői egység ár eladáskor</th>
            <td></td>
            <th>Szervezői haszonkulcs eladáskor</th>
            <td></td>
        </tr>
        <tr>
            <th>Össz. beszer. ár</th>
            <td></td>
            <th>Résztvevői egység ár eladáskor</th>
            <td></td>
            <th>Résztvevői haszonkulcs eladáskor</th>
            <td></td>
        </tr>
    </tbody>
</table>


<table>
    <caption>Eladás elött</caption>

    <tbody>
        <tr>
            <td>Raktárban:</td>
            <td></td>
        </tr>
        <tr>
            <td>Szervezőnek eladott:</td>
            <td></td>
        </tr>
        <tr>
            <td>Résztvevőnek eladott:</td>
            <td></td>
        </tr>
        <tr>
            <td>Összes eladott:</td>
            <td></td>
        </tr>
        <tr>
            <td>Szervezői össz. bevétel:</td>
            <td></td>
        </tr>
        <tr>
            <td>Résztvevői össz. bevétel:</td>
            <td></td>
        </tr>
        <tr>
            <td>Összes bevétel:</td>
            <td></td>
        </tr>
        <tr>
            <td>Profit:</td>
            <td></td>
        </tr>
    </tbody>
</table>

<table>
    <caption>Eladás után</caption>

    <tbody>
        <tr>
            <td>Raktárban:</td>
            <td></td>
        </tr>
        <tr>
            <td>Szervezőnek eladott:</td>
            <td></td>
        </tr>
        <tr>
            <td>Résztvevőnek eladott:</td>
            <td></td>
        </tr>
        <tr>
            <td>Összes eladott:</td>
            <td></td>
        </tr>
        <tr>
            <td>Szervezői össz. bevétel:</td>
            <td></td>
        </tr>
        <tr>
            <td>Résztvevői össz. bevétel:</td>
            <td></td>
        </tr>
        <tr>
            <td>Összes bevétel:</td>
            <td></td>
        </tr>
        <tr>
            <td>Profit:</td>
            <td></td>
        </tr>
    </tbody>
</table>

<h4>Fizető címletek</h4>
<NoteDisplayTable></NoteDisplayTable>

<h4>Visszajáró címletek</h4>
<NoteDisplayTable></NoteDisplayTable>
