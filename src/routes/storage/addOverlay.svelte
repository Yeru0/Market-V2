<!-- TODO Handle form -->
<div>

    <h2>Termék hozzáadása</h2>

    <form method="post">

        <label for="product-name" class="product-name">
            Terméknév
            <input type="text" name="product-name">
        </label>
        
        <label for="purchased-amount" class="purchased-amount">
            Beszerzett mennyiség
            <input type="text" name="purchased-amount">
        </label>

        <label for="purchase-price" class="purchase-price">
            Beszerzési ár
            <input type="text" name="purchase-price"> Ft
        </label>

        <label for="organiser-profit-margin" class="organiser-profit-margin">
            Szervezői haszonkulcs
            <input type="text" name="purchase-price"> %
        </label>

        <label for="participant-profit-margin" class="participant-profit-margin">
            Résztvevői haszonkulcs
            <input type="text" name="purchase-price"> %
        </label>

        <div class="submit-buttons">
            <button type="submit" class="submit">Termék hozzáadása</button>
            <button type="submit" class="cancel">Mégsem</button>
        </div>

    </form>

</div>