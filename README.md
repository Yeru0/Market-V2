# Üdv!
Ez itt [Horváth Péter Benedek](https://github.com/Yeru0) által készített és [Simon Ádám Gyula](https://github.com/simonadamgyula) által felügyelt büfés eladó alkalmazás.

## Elhivatáok
- 100% organikus, termelői, kézzel készült stílusok 🥀
- 100% organikus, termelői, kézzel készült kód 🌸
- Jót tesz a léleknek 😌

## License
Használj bátran a kódból bármit, de legalább írd oda, hogy honnan van 😉

## Használat
Erősen ajánlott, hogy tudod mit csinálsz! Továbbá ajánlott a svelte interpreter és a javascript nyelv illetve a git és github "mélyreható" ismerete. Az alkalmazást ezek nélkül is lehet kezelni, de nem ajánlott!

### Hol kezd, ha nem tudod mit csinálsz 10 lépésben
1. Töltsd le az egész repo-t. Ezt legegyszerűbben úgy teheted meg, ha visszamész a [repo főoldalára](https://github.com/Yeru0/Market-V2) és megkeresed a kék "Code" feliratú gombot, majd rákattintassz.
2. A legördülő menüből válaszd a "Download Zip" opciót. Ez le fog tölteni egy tömörített állományt
3. Csomagold ki a frissen letöltött állítmányod, és lehetőleg helyezd át a letöltések mappából
4. Nyisd meg a mappát és látni fogsz benne egy adag fájlt, ezek az alkalmazás működéséhez szükséges fájlok.
5. Kattints bele a mappa helyét jelző sávba a fájlkezelő tetején. (Valami olyasmi van beleírva, hogy "Asztal>Market-V2-main")
6. Írd be, hogy cmd, ez felfog hozni egy parancssort.
7. Ide gépeld be a következőt: "npm i". Ez lefogja tölteni az összes alkalmazás futtatásához szükséges csomagot. (Amennyiben azt írja ki, hogy "npm is not recognised as an internal or external command", akkor el kell látogass a [node.js weboldalára](https://nodejs.org/en/download), és le kell töltened a node-ot. Ezt a linkelt weboldalon megteheted, ha lejjebb görgetsz és rákattintassz a "Windows Installer (.msi)" gombra. Ha nem windows-t használsz, akkor a gomb feletti legördülő menüből válaszd ki az operációs rendszered. A letöltés után futtasd a letöltött fájlt, és nyomkodd végig a telepítést. Ez után már működnie kell az "npm i" parancsnak)
8. Ez után egy darabig gondolkodni fog az ablak, de végül megjelenik egy adag szöveg, és az ablak újra várni fogja a bevitelt. Ezt jelzi a villogó kurzor.
9. Most írd be, hogy "npm run dev"
10. Ha sikeresen végrehajtottál mindent, akkor most megjelenik egy webcím a parancssorban, ami valami hasonló lesz: "http://localhost:5175/". Ha ezt beírod a böngésződbe, már látni is fogod az alkalmazást.
Ha út közben bárhol elakadsz kérdezz meg egy 11. évfolyamon felüli A osztályos tanulót, és, ha nem tud segíteni, akkor belenyugodhatsz, hogy kifogtál egy béna infóst 😌.
## Használat
### Termékek kosárba helyezése
A főoldalon (/) lehet termékeket eladni. Ha rákattintasz bármelyik termék nevére, az a termék belekerül a kosárba. Ha a termék nevére többször kattintasz, akkor több kerül ebből a termékből a kosárba. Ha kattintás közben nyomod a shift-et akkor tudsz termékeket kivenni a kosárból. Ha kattintás közben nyomod a ctrl-t akkor az összes ilyen termék bekerül a kosárba. Ha kattintáskor nyomod a shift-et és a ctrl-t is akkor az összes eddig betett ilyen termék kikerül a kosárból. Termékeket tudsz a kosárban vonalkódolvasóval is regisztrálni. Csatlakoztatsd az olvasót, szkenneld be a termék vonal vagy qr kódját és bekerül a termék a kosárba. Fontos, hogy olyan szkennert használj, amit a windows billentyűzetnek érzékel.
### A kosár
A kosár csak akkor látható, ha van benne termék. Ha tettél legalább egy terméket a kosárba, akkor, ha legörgetsz a "Kosár" feliratig, akkor rögtön alatta fogsz látni két gombot. Az egyik a "Kosár ürítése", ez kiüríti a kosarat. A másik a "Termék kivétele" vagy "Termékek kivétele" feliratú gomb. Ez a gomb kiveszi az adatbázisból a kosárban lévő termékeket, annélkül, hogy ezeket a termékeket beleszámítaná a pénzügyi statisztikába. Ha erre a gombra nyomsz, akkor a kosár kiürül és megjelenik allul egy kis üzenet, ami tájékoztat minket róla, hogy sikeres volt az kivétel.
#### Termékek a kosárban
Lejjebgörgetve találsz egy listát a kosárban lévő termékekről. Baloldalt először a termék nevét látod, aztán mennyiségét, majd az árát, végül egy törlés gombot. A mennyiség mellett látsz két gombot. A baloldali "-" feliratú gomb egy terméket kivesz a kosárból, a "+" feliratú gomb hozzáad egy terméket a kosárhoz. Ha nyomod a ctrl-t miközben a "-" felirtú gombra kattintassz akkor egy kivételével az összes termék kikerül a kosárból. Ha nyomod a ctrl-t miközben a "+" felirtú gombra kattintassz akkor egy összes termék be kerül a kosárba. Ha már csak egy ilyen termék van a kosárban, és rákattintassz a "-" feliratú gombra, akkor az összes ilyen termék kikerült a kosárból. Ha rányomsz a "Törlés" feliratú gombra a legjobboldalon, akkor az összes ilyen termék kikerül a kosárból.
#### Címletezés
Ha lejjebbgörgetsz, akkor két oszlopot fogsz látni. Az egyik a "Fizetendő címlet", a másik a "Visszajáró címlet". A "Fizetendő címlet" feliratú oszlopban legfellül látható, hogy mennyit kell a vendégnek fizetnie a kosárban lévő termékekért. Ez alatt egy "Fizető címlet" feliratú táblázat található. A táblázat két oszlopból áll. Az egyik az összes magyar forint címletet mutatja a bal oldalon, a jobb oldalon pedig, hogy az adott címletből jelenleg hány van beütve. Itt be kell ütni, hogy a vendég milyen címlettel fizetett. Ezt úgy teheted meg, hogy rákattintassz a fizettett címlet mennyiségével feliratozott gombra (Ha a vendég egy 500-assal fizetett, akkor rá kell nyomnod az "500" feliratú gombra). Ha a vendég egy fajta címletből többet használ, akkor azt úgy tudod beütni, hogy a címlet értékét jelző gombra többször rányomsz egymás után, addig, amíg a jobb oldalon látható számláló nem mutatja azt a mennyiséget, amennyi címletet adott a vendég. Ha véletlen túl sokat ütöttél be valamelyik címletből, akkor egy-egy címletet ki tudsz venni, ha a számot jelző gombra kattintassz. Ha az összeset ki szeretnéd venni egy adott címletből akkor nyomd le a ctrl-t miközben rákattintassz a mennyiséget jelző gombra. A táblázat alatt látható, hogy összesen hány forint lett beütve fizető címletek formájában.
A "Visszajáró címlet" feliratú oszlop tartalma mind addig azt írja, hogy "A fizetett összeg még nem elég!" ameddig a nincs beütve annyi forint fizető címletnek, mint amennyibe a termékek kerülnek. Tehát a "Visszajáró címlet" feliratú oszlop tartalma akkor fog látszódni, ha a fizetendő oszlop tetején és alján látható szám egyezik, vagy az alsó nagyobb.
Ha megjelent a visszajáró oszlop, akkor a visszajáró oszlop tetején megjelenik, hogy hány forintot kell visszaadnod. Alatta megjelenik egy táblázat. A táblázat két oszlopból áll. Az egyik az összes magyar forint címletet mutatja a bal oldalon, a jobb oldalon pedig, hogy az adott címletből jelenleg hány van beütve. Itt be kell ütni, hogy a milyen címletekkel szereznél visszaadni. Ezt úgy teheted meg, hogy rákattintassz a fizettett címlet mennyiségével feliratozott gombra (Ha a vendég egy 500-assal fizetett, akkor rá kell nyomnod az "500" feliratú gombra). Ha a vendég egy fajta címletből többet használ, akkor azt úgy tudod beütni, hogy a címlet értékét jelző gombra többször rányomsz egymás után, addig, amíg a jobb oldalon látható számláló nem mutatja azt a mennyiséget, amennyi címletet adott a vendég. Ha véletlen túl sokat ütöttél be valamelyik címletből, akkor egy-egy címletet ki tudsz venni, ha a számot jelző gombra kattintassz. Ha az összeset ki szeretnéd venni egy adott címletből akkor nyomd le a ctrl-t miközben rákattintassz a mennyiséget jelző gombra. Ha a felhasználó fizetett eleget és vissza tudsz adni, akkor a program automatikusan be fogja ütni, hogy hány forintot adj vissza. Ebbe figyelembe fogja venni, hogy jelenleg neked jelenleg hány forintod van, amiből vissza tudsz adni. Ha valamiért nem tudsz visszaadni akkor az a felirat fog megjelenni a "Visszajáró címlet" feliratú oszlop tartalmaként, hogy "Nem lehet visszajárót adni!".
#### Kosár eladása
A kosár legalján van egy eladás gomb. Ez a gomb csak akkor aktív, ha a felhasználó eleget fizetett és te pontosan annyi forintot ütöttél be visszajárócímletként, ahány forint amúgy a visszajáró lenne. Ha a gomb aktív akkor rá tudsz kattintani, a kosár kiürül és megjelenik allul egy kis üzenet, ami tájékoztat minket róla, hogy sikeres volt az eladás.
TODO ezt még be kell fejezni
## Verziók
Ez jelenleg a büfés alkalmazás második iterációja.
Ebben a verzióban nincs szükség internetre, mert helyileg tárol az alkalmazás.
Itt-ott lett optimalizálva egy-két dolog az előző iterációhoz képest,
illetve lett egy pár új kényelmi funkció is, mint például a kódbeolvasás.
A MARKET V-3-ra tekintettel jótanácsok:
- Mindent a saját komponensébe
- A Type-okat célszerű külön fájlba tárolni
- Kommentek
- A termék árát a kosárban a kosár ára alapján számítsa, ne pedig egyesével minden egyes terméknek legyen megadva az ára.
- QuickCheckout címletezés nélkül
- Személyreszabható árlista (Kategóriák)
- Qr kódos Árlista?
- Kiszállításos rendeléses dolog?
## Bugok
- Az adatbázis van, hogy szar, ezért érdemes git-tel is figyelni főleg az adatbázistáblák változását