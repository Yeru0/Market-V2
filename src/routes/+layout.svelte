<script>

    const { children } = $props()

</script>

<nav>

    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Irányítópult</a></li>
        <li><a href="/storage">Raktár</a></li>
        <li><a href="/prices">Árlista</a></li>
    </ul>

    <label for="sell-to">
        Szervezői árlista:
        <input type="checkbox" name="sell-to">
    </label>

</nav>

{@render children()}