<script lang="ts">
	import { Code } from "$lib/code-reader/codeReaderObjects";
    import { priceListStateSellingToOrg } from "$lib/shared.svelte";

    let {basket, products} = $props()
    
    // Function that listens to the code reader,
    // and constructs the code from it's input
    let codeS: string = "";
    let lastKeyPressTime = 0;

    const constructCode = (e: KeyboardEvent): Promise<string> => {
        return new Promise((resolve: (value: string) => void, reject: (value: void) => void) => {
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
    
    const addToBasketOnCode = (code: string):void => {
        for(const product of products) {

            
            

            if(!product.code || !product.canAddMore) return

            if (product.code == code && !$priceListStateSellingToOrg) basket.addToBasket(product, "part")
            if (product.code == code && $priceListStateSellingToOrg) basket.addToBasket(product, "org")
        }
    }
</script>

<!-- Code-reader listening -->
<svelte:window
    onkeydown={(e) => {
            constructCode(e).then((result) => {
                let code = new Code(result)
                codeS = ""
                addToBasketOnCode(code.code)
            })
        }}
/>