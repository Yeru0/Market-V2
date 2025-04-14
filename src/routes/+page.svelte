<script lang="ts">
    import NoteSelectionTable from "./noteSelectionTable.svelte";
	import { Code } from "$lib/code-reader/codeReaderObjects";
    import { Product } from "$lib/siteObjects"


    let { data } = $props()
    let products: Product[] = []

    for (const product of data.products) {
        products.push(new Product(product))
    }

    console.log(products)


    // Function that listens to the code reader,
    // and constructs the code from it's input
    let codeS: string = "";
    let lastKeyPressTime = 0;

    function constructCode(e: KeyboardEvent): Promise<string> {
        return new Promise((resolve: (value: string) => void, reject: (value: void) => void) => {
            e.preventDefault();

            // Only construct code if not keyboard input
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - lastKeyPressTime 
            lastKeyPressTime = currentTime;
        


            let key: string = e.key;
            if (
                key == "Shift" ||
                key == "Control" ||
                key == "AltGraph" ||
                key == "Alt" ||
                key == "CapsLock" ||
                lastKeyPressTime === 0 ||
                timeDifference > 10 ||
                key == "Meta"
            ) {
                return;
            }


            if (key != "Enter") {
                codeS += key;
            } else {
                resolve(codeS);
            }

            // Promise end
        });

        // method constructCode END
    };

</script>




<!-- Code-reader listening -->
<svelte:window onkeydown={(e) => {
    constructCode(e).then((result) => {
        let code = new Code(result)
        codeS = ""
    })
}} />


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
    
                {#each products as product}                    
                <tr>
                    <td>{product.name}</td>
                    <td><button>400 Ft</button></td>
                    <td><button>500 Ft</button></td>
                    <td>3/10</td>
                    <td>7</td>
                </tr>
                {/each}
    
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

