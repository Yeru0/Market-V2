# Üdv!
Ez itt [Horváth Péter Benedek](https://github.com/Yeru0) által készített és [Simon Ádám Gyula](https://github.com/simonadamgyula) által felügyelt büfés eladó alkalmazás.
## Elhivatáok
- 100% organikus, termelői, kézzel készült stílusok 🥀
- 100% organikus, termelői, kézzel készült kód 🌸
- Jót tesz a léleknek 😌
## License
Használj bátran a kódból bármit, de legalább írd oda, hogy honnan van 😉
## Telepítés
Erősen ajánlott, hogy tudod mit csinálsz! Továbbá ajánlott a svelte interpreter és a javascript nyelv, a node és npm, illetve a git és github ismerete. Az alkalmazást ezek nélkül is lehet kezelni, de nem ajánlott!
### Hol kezd, ha nem tudod mit csinálsz 10 lépésben
1. Töltsd le az egész repo-t. Ezt legegyszerűbben úgy teheted meg, ha visszamész a [repo főoldalára](https://github.com/Yeru0/Market-V2) és megkeresed a kék "Code" feliratú gombot, majd rákattintasz.
2. A legördülő menüből válaszd a "Download Zip" opciót. Ez le fog tölteni egy tömörített állományt
3. Csomagold ki a frissen letöltött állítmányod, és lehetőleg helyezd át a letöltések mappából
4. Nyisd meg a mappát és látni fogsz benne egy adag fájlt, ezek az alkalmazás működéséhez szükséges fájlok.
5. Kattints bele a mappa helyét jelző sávba a fájlkezelő tetején. (Valami olyasmi van beleírva, hogy "Asztal>Market-V2-main")
6. Írd be, hogy cmd, ez felfog hozni egy parancssort.
7. Ide gépeld be a következőt: "npm i". Ez lefogja tölteni az összes alkalmazás futtatásához szükséges csomagot. (Amennyiben azt írja ki, hogy "npm is not recognised as an internal or external command", akkor el kell látogass a [node.js weboldalára](https://nodejs.org/en/download), és le kell töltened a node-ot. Ezt a linkelt weboldalon megteheted, ha lejjebb görgetsz és rákattintasz a "Windows Installer (.msi)" gombra. Ha nem windows-t használsz, akkor a gomb feletti legördülő menüből válaszd ki az operációs rendszered. A letöltés után futtasd a letöltött fájlt, és nyomkodd végig a telepítést. Ez után már működnie kell az "npm i" parancsnak)
8. Ez után egy darabig gondolkodni fog az ablak, de végül megjelenik egy adag szöveg, és az ablak újra várni fogja a bevitelt. Ezt jelzi a villogó kurzor.
9. Most írd be, hogy "npm run dev"
10. Ha sikeresen végrehajtottál mindent, akkor most megjelenik egy webcím a parancssorban, ami valami hasonló lesz: "http://localhost:5175/". Ha ezt beírod a böngésződbe, már látni is fogod az alkalmazást.
Ha út közben bárhol elakadsz kérdezz meg egy 11. évfolyamon felüli A osztályos tanulót, és, ha nem tud segíteni, akkor belenyugodhatsz, hogy kifogtál egy béna infóst 😌.
## Használat
Ameddig nem adsz hozzá legalább egy terméket, addig az összes oldalon az a szöveg látható, hogy "Nincsenek termékek raktáron"
### Termék hozzáadása
Terméket a "Raktár" oldalon (/storage) tudsz hozzáadni. Az oldal legtetején jobb oldalon láthatod az "Áru hozzáadása" feliratú gombot. Ha ezt megnyomod, akkor fel ugrik egy ablak.
Itt először ki tudod választani, hogy hogyan szeretnéd megadni a terméked árát.
A százalékos ár azt jelenti, hogy a beszerzési árhoz fogja igazítani a termék árát. Ezt haszonkulcsként van feltüntetve. A termék árát a következő képlettel számolja ki: 
`p = (n/a)*(1+(k/100))`, ahol `n` - a beszerzett mennyiség, `a` - a beszerzési ár, `k` - a megadott haszonkulcs, `p` - pedig a termék ára.
A számos ár azt jelenti, hogy konkrétan meg tudod adni, hogy mennyibe kerüljön a termék. Ha ezt használod figyelj arra, hogy az ár legalább annyi legyen, mint a termék egységára (Ár/Mennyiség)! Ha ez nem teljesül, akkor nem fogod tudni hozzáadni a terméket! Ha a termék árát százalékosan adod meg, akkor a termék számos ára a legközelebbi öttel osztható számra lesz kerekítve.
Ha kiválasztottad, akkor meg kell adnod a terméked nevét, hogy hány darab van az adott termékből, hogy az összesen mennyibe került az összes ilyen termék (Tehát nem csak egy darab, hanem az összes). Aztán attól függően, hogy az előbb százalékos vagy számos árat választottál meg kell adnod vagy a haszonkulcsot vagy a termék árát. Végül meg kell adnod egy vonalkódot, amit majd be tudsz olvasni. Ha nem használsz vonalkódokat, akkor írj be bármilyen kétszámjegyű számot.
Ha mindent megadtál akkor nyomj a "Termék hozzáadása" feliratú gombra. Ha az enter billentyűt lenyomod, akkor ugyan azt éred el, mintha a "Termék hozzáadása" feliratú gombra nyomnál. Fontos, hogy a program automatikusan le fogja venni a vonalkód első számjegyét, ez a program későbbi hibátlan működésért fontos. Ha sikerült hozzáadni a terméket, akkor el fog tűnni a felugróablak és alul fogsz egy "Termék létrehozva!" feliratot. Ha valamiért nem sikerül létrehozni a terméket akkor egy "A termék létrehozása sikertelen volt!" felirat fog megjelenni.  A "Mégsem" feliratú gombbal megszünteted a hozzáadást és eltűnik a felugróablak. 
### Termék módosítása
Terméket a "Raktár" oldalon (/storage) tudsz módosítani. Az ABC sorrendbe rendezett listából ki kell keresned a módosítani kívánt terméket. Keresni a ctrl és az f gomb egyidejű lenyomásával tudsz. Ha megvan a termék akkor a termék neve mellett jobb felül két gombot fogsz látni. Az egyik gombra "Termék törlése", a másikra a "Termék módosítása" van írva. Ha megnyomod a "Termék módosítása" feliratú gombot, akkor fel ugrik egy ablak.
Itt először ki tudod választani, hogy hogyan szeretnéd módosítani a terméked árát.
A százalékos ár azt jelenti, hogy a beszerzési árhoz fogja igazítani a termék árát. Ezt haszonkulcsként van feltüntetve. A termék árát a következő képlettel számolja ki: 
`p = (n/a)*(1+(k/100))`, ahol `n` - a beszerzett mennyiség, `a` - a beszerzési ár, `k` - a megadott haszonkulcs, `p` - pedig a termék ára.
A számos ár azt jelenti, hogy konkrétan meg tudod adni, hogy mennyibe kerüljön a termék. Ha ezt használod figyelj arra, hogy az ár legalább annyi legyen, mint a termék egységára (Ár/Mennyiség)! Ha ez nem teljesül, akkor nem fogod tudni módosítani a terméket! Ha a termék árát százalékosan adod meg, akkor a termék számos ára a legközelebbi öttel osztható számra lesz kerekítve.
Ha kiválasztottad, akkor tudod módosítani a terméked nevét, hogy hány darab van az adott termékből, hogy az összesen mennyibe került az összes ilyen termék (Tehát nem csak egy darab, hanem az összes). Aztán attól függően, hogy az előbb százalékos vagy számos árat választottál tudod módosítani vagy a haszonkulcsot vagy a termék árát. Végül tudod módosítani a vonalkódot, amit majd be tudsz olvasni. Ha nem használsz vonalkódokat, akkor írj be bármilyen kétszámjegyű számot. Előfordulhat, hogy a vonalkód első számjegye hiányzik az eredetihez képest, ez szándékos és nem hiba, a program hibátlan működésért szükséges!
Ha mindent megadtál akkor nyomj a "Termék módosítása" feliratú gombra. Ha az enter billentyűt lenyomod, akkor ugyan azt éred el, mintha a "Termék módosítása" feliratú gombra nyomnál.  Ha sikerült módosítani a terméket, akkor el fog tűnni a felugróablak és alul fogsz egy "Termék módosítva!" feliratot. Ha valamiért nem sikerül létrehozni a terméket akkor egy "A termék módosítása sikertelen volt!" felirat fog megjelenni.  A "Mégsem" feliratú gombbal megszünteted a módosítást és eltűnik a felugróablak.
### Termék törlése
Terméket a "Raktár" oldalon (/storage) tudsz törölni. Az ABC sorrendbe rendezett listából ki kell keresned a törölni kívánt terméket. Keresni a ctrl és az f gomb egyidejű lenyomásával tudsz. Ha megvan a termék akkor a termék neve mellett jobb felül két gombot fogsz látni. Az egyik gombra "Termék törlése", a másikra a "Termék módosítása" van írva. Ha megnyomod a "Termék törlése" feliratú gombot, akkor fel ugrik egy ablak.
Itt ki kell választanod, hogy biztosan törlöd-e a terméket. A "Termék törlése" feliratú gombra kattintva kitörlöd a terméket. Ha sikeres volt a termék törlése, akkor alul fogsz egy "Termék törölve!" feliratot látni. Ha valamiért nem sikerül létrehozni a terméket akkor egy "A termék törlése sikertelen volt!" felirat fog megjelenni.  A "Mégsem" feliratú gombra kattintva megszünteted a törlést, az ablak eltűnik és a termék nem kerül törlésre.
### Termékek statisztikája
A termékek statisztikáját a "Raktár" oldalon (/storage) találod.
A termékek statisztikája a következőket jelenti:
- Profit: Az összes termék eladásából származó bevétel és a beszerzési ár különbsége.
- Beszerzett: Az összes beszerzett termék.
- Beszerzési ár: Mennyibe került az összes ilyen termék (Tehát nem csak egy darab, hanem az összes).
- Beszerzési egységár: Egy darab termék mennyibe kerül. A beszerzési ár és a beszerzett statisztikák hányadosa.
- Raktározva: Hány darab termék van még raktáron.
- Kivett: Hány darab termék lett nem eladva, hanem kivéve. A kivétel azt jelenti, hogy az adatbázisból kikerül a termék, anélkül, hogy a termékeket beleszámítaná a pénzügyi statisztikába.
- Szervezőnek eladott: Hány termék lett szervezőknek eladva.
- Szervezői egy. ár.: Szervezői egység ár. Mennyibe kerül egy darab termék szervezői áron.
- Szervezői Egy. prof.: Szervezői egység profit. Mekkora a profit egy darab szervezői áron eladott terméken. A profit egy termék eladásából származó bevétel és egy termék  beszerzési árának különbsége.
- Szervezői H. K.: Haszonkulcs. A beszerzési árhoz képest mennyivel több egy szervezőnek eladott termék ára. A termék árát a következő képlettel számolja ki: `p = (n/a)*(1+(k/100))`, ahol `n` - a beszerzett mennyiség, `a` - a beszerzési ár, `k` - a megadott haszonkulcs, `p` - pedig a termék ára.
- Szervezői ELÁBÉ: Eladott áruk beszerzési értéke. Az összes eddig szervezői áron eladott áruk mennyibe kerültek, amikor megvetted. K.b. egy fordított profit.
- Szervezői bevétel: Az összes eddig szervezői áron eladott termék után kapott pénz. Az ELÁBÉ és a Profit összege.
- Résztvevőnek eladott: Hány termék lett résztvevőknek eladva.
- Résztvevői egy. ár.: Résztvevői egység ár. Mennyibe kerül egy darab termék résztvevői áron.
- Résztvevői Egy. prof.: Résztvevői egység profit. Mekkora a profit egy darab résztvevői áron eladott terméken. A profit egy termék eladásából származó bevétel és egy termék  beszerzési árának különbsége.
- Résztvevői H. K.: Haszonkulcs. A beszerzési árhoz képest mennyivel több egy résztvevőnek eladott termék ára. A termék árát a következő képlettel számolja ki: `p = (n/a)*(1+(k/100))`, ahol `n` - a beszerzett mennyiség, `a` - a beszerzési ár, `k` - a megadott haszonkulcs, `p` - pedig a termék ára.
- Résztvevői ELÁBÉ: Eladott áruk beszerzési értéke. Az összes eddig résztvevői áron eladott áruk mennyibe kerültek, amikor megvetted. K.b. egy fordított profit.
- Résztvevői bevétel: Az összes eddig résztvevői áron eladott termék után kapott pénz. Az ELÁBÉ és a Profit összege. 
- Összes eladott: Az eddigi összesen eladott termék
- Összes ELÁBÉ: Eladott áruk beszerzési értéke. Az összes eddig eladott áru mennyibe kerültek, amikor megvetted.
- Összes bevétel: Az összes eddig szervezői áron eladott termék után kapott pénz.
### Egyéb információ a raktár oldalról
A következő információk a "Raktár" oldalra (/storage) vonatkoznak. Ha egy termékből az összes elfogy, akkor a termék automatikusan az oldal legaljára kerülnek. Ilyenkor inaktív a termék. Az inaktív termékek elrendezése eltér a raktár oldal ABC elrendezésétől. Az inaktív termékek fordított ABC sorrendben vannak. Ez azért van így, hogy ne kelljen keresned az inaktív termékek listájának az elejét, hanem, ha letekersz az oldal aljára, akkor lentről felfele lesznek ABC sorrendben az inaktív termékek.
### Termékek kosárba helyezése
Az "Eladás" oldalon (/) lehet termékeket eladni. Ha rákattintasz bármelyik termék nevére, az a termék belekerül a kosárba. Minden terméknet két ára van: egy szervezői és egy résztvevői. Két ár között úgy tudsz váltani, hogy a navigációs sáv jobb oldalán található "Szervezői árlista" feliratú dobozt bepipálod. Ilyenkor szervezői áron fogsz eladni, ha nincs bepipálva, akkor résztvevői áron fogsz eladni. A szervezői árlista bepipálását úgy is tudod változtatni, hogy lenyomod a shift-et és vele egyidejűleg le nyomod a space-t is, ilyenkor ha be volt pipálva akkor ki lesz pipálva, ha ki volt pipálva be lesz pipálva.  Ha a termék nevére többször kattintasz, akkor több kerül ebből a termékből a kosárba. Ha kattintás közben nyomod a shift-et akkor tudsz termékeket kivenni a kosárból. Ha kattintás közben nyomod a ctrl-t akkor az összes ilyen termék bekerül a kosárba. Ha kattintáskor nyomod a shift-et és a ctrl-t is akkor az összes eddig betett ilyen termék kikerül a kosárból. Termékeket tudsz a kosárban vonalkódolvasóval is regisztrálni. Csatlakoztasd az olvasót, szkenneld be a termék vonal vagy qr kódját és bekerül a termék a kosárba. Fontos, hogy olyan szkennert használj, amit a windows billentyűzetnek érzékel.
### A kosár
A kosár az "Eladás" oldalon (/) csak akkor látható, ha van benne termék. Ha tettél legalább egy terméket a kosárba, akkor, ha legörgetsz a "Kosár" feliratig, akkor rögtön alatta fogsz látni két gombot. Az egyik a "Kosár ürítése", ez kiüríti a kosarat. Ezt úgy is megteheted, hogy ha vannak termékek a korárban megnyomod az escape billentyűt. A másik a "Termék kivétele" vagy "Termékek kivétele" feliratú gomb. Ez a gomb kiveszi az adatbázisból a kosárban lévő termékeket, anélkül, hogy ezeket a termékeket beleszámítaná a pénzügyi statisztikába. Ha erre a gombra nyomsz, akkor a kosár kiürül és megjelenik alul egy kis üzenet, ami tájékoztat minket róla, hogy sikeres volt az kivétel.
#### Termékek a kosárban
Lejjebb görgetve találsz egy listát a kosárban lévő termékekről. Baloldalt először a termék nevét látod, aztán mennyiségét, majd az árát, végül egy törlés gombot. A mennyiség mellett látsz két gombot. A baloldali "-" feliratú gomb egy terméket kivesz a kosárból, a "+" feliratú gomb hozzáad egy terméket a kosárhoz. Ha nyomod a ctrl-t miközben a "-" feliartú gombra kattintasz akkor egy kivételével az összes termék kikerül a kosárból. Ha nyomod a ctrl-t miközben a "+" feliratú gombra kattintasz akkor egy összes termék be kerül a kosárba. Ha már csak egy ilyen termék van a kosárban, és rákattintasz a "-" feliratú gombra, akkor az összes ilyen termék kikerült a kosárból. Ha rányomsz a "Törlés" feliratú gombra a legjobboldalon, akkor az összes ilyen termék kikerül a kosárból.
#### Címletek elszámolása
Ha lejjebb görgetsz, akkor két oszlopot fogsz látni. Az egyik a "Fizetendő címlet", a másik a "Visszajáró címlet". A "Fizetendő címlet" feliratú oszlopban legfelül látható, hogy mennyit kell a vendégnek fizetnie a kosárban lévő termékekért. Ez alatt egy "Fizető címlet" feliratú táblázat található. A táblázat két oszlopból áll. Az egyik az összes magyar forint címletet mutatja a bal oldalon, a jobb oldalon pedig, hogy az adott címletből jelenleg hány van beütve. Itt be kell ütni, hogy a vendég milyen címlettel fizetett. Ezt úgy teheted meg, hogy rákattintasz a fizetett címlet mennyiségével feliratozott gombra (Ha a vendég egy 500-assal fizetett, akkor rá kell nyomnod az "500" feliratú gombra). Ha a vendég egy fajta címletből többet használ, akkor azt úgy tudod beütni, hogy a címlet értékét jelző gombra többször rányomsz egymás után, addig, amíg a jobb oldalon látható számláló nem mutatja azt a mennyiséget, amennyi címletet adott a vendég. Ha véletlen túl sokat ütöttél be valamelyik címletből, akkor egy-egy címletet ki tudsz venni, ha a számot jelző gombra kattintasz. Ha az összeset ki szeretnéd venni egy adott címletből akkor nyomd le a ctrl-t miközben rákattintasz a mennyiséget jelző gombra. A táblázat alatt látható, hogy összesen hány forint lett beütve fizető címletek formájában.
A "Visszajáró címlet" feliratú oszlop tartalma mind addig azt írja, hogy "A fizetett összeg még nem elég!" ameddig a nincs beütve annyi forint fizető címletnek, mint amennyibe a termékek kerülnek. Tehát a "Visszajáró címlet" feliratú oszlop tartalma akkor fog látszódni, ha a fizetendő oszlop tetején és alján látható szám egyezik, vagy az alsó nagyobb.
Ha megjelent a visszajáró oszlop, akkor a visszajáró oszlop tetején megjelenik, hogy hány forintot kell visszaadnod. Alatta megjelenik egy táblázat. A táblázat két oszlopból áll. Az egyik az összes magyar forint címletet mutatja a bal oldalon, a jobb oldalon pedig, hogy az adott címletből jelenleg hány van beütve. Itt be kell ütni, hogy a milyen címletekkel szereznél visszaadni. Ezt úgy teheted meg, hogy rákattintasz a fizettett címlet mennyiségével feliratozott gombra (Ha a vendég egy 500-assal fizetett, akkor rá kell nyomnod az "500" feliratú gombra). Ha a vendég egy fajta címletből többet használ, akkor azt úgy tudod beütni, hogy a címlet értékét jelző gombra többször rányomsz egymás után, addig, amíg a jobb oldalon látható számláló nem mutatja azt a mennyiséget, amennyi címletet adott a vendég. Ha véletlen túl sokat ütöttél be valamelyik címletből, akkor egy-egy címletet ki tudsz venni, ha a számot jelző gombra kattintasz. Ha az összeset ki szeretnéd venni egy adott címletből akkor nyomd le a ctrl-t miközben rákattintasz a mennyiséget jelző gombra. Ha a felhasználó fizetett eleget és vissza tudsz adni, akkor a program automatikusan be fogja ütni, hogy hány forintot adj vissza. Ebbe figyelembe fogja venni, hogy jelenleg neked jelenleg hány forintod van, amiből vissza tudsz adni. Ha valamiért nem tudsz visszaadni akkor az a felirat fog megjelenni a "Visszajáró címlet" feliratú oszlop tartalmaként, hogy "Nem lehet visszajárót adni!".
#### Kosár eladása
A kosár legalján van egy eladás gomb. Ez a gomb csak akkor aktív, ha a felhasználó eleget fizetett és te pontosan annyi forintot ütöttél be visszajárócímletként, ahány forint amúgy a visszajáró lenne. Ha a gomb aktív akkor rá tudsz kattintani, a kosár kiürül és megjelenik alul egy kis üzenet, ami tájékoztat minket róla, hogy sikeres volt az eladás. Ha egy adott termékből az összes el lett adva vagy ki lett véve, akkor az adott termék eltűnik az eladható termékek közül és inaktív lesz.
### Az irányítópult statisztikája
Az irányítópult statisztikáját az "Irányítópult" oldalon (/dashboard) találod. Az irányítópulton a statisztika két részből áll. A bal oldalon láthatóak a pénzügyi statisztikák, a jobb oldalon pedig a raktár statisztikái
#### Pénzügyi statisztikák jelentése
- Szervezői bevétel: Az összes eddig szervezőnek eladott termék után kapott összes pénz.
- Résztvevői bevétel: Az összes eddig résztvevőnek eladott termék után kapott összes pénz.
- Összes bevétel: Az összes eddig eladott termék után kapott összes pénz.
- Szervezői profit: A szervezői egy. prof. és az eddig szervezőnek eladott összes termék szorzata.
- Résztvevői profit: A résztvevői egy. prof. és az eddig résztvevőnek eladott összes termék szorzata.
- Összes profit: Az eddigi összes bevétel és a beszerzési ár különbsége.
- Beszerzési ár: Az összes termék összesített beszerzési ára.
- ELÁBÉ: Eladott áruk beszerzési értéke. Az eddigi eladott összes termék beszerzési árának az összege. 
#### Raktárstatisztikák jelentése
- Összes termék: Az összes beszerzett termék.
- Raktárban: A jelenleg raktárban lévő termékek.
- Termékfajták: Hány különböző típusú termék van raktáron.
- Szervezőnek eladott: Hány termék lett szervezőknek eladva.
- Résztvevőnek eladott: Hány termék lett résztvevőnek eladva.
- Kivett: Hány termék lett kivéve.
### Címletek kezelése az irányítópulton
A címleteket az "Irányítópult" oldalon (/dashboard) tudod módosítani és megtekinteni. A "Címletek" című rész bal felső sarkában írja az összes jelenleg raktáron lévő címlet összegét. A jobb felső sarokban van egy "Módosítás" feliratú gomb. Az összeg illetve a gomb alatt van egy táblázat, aminek a bal oszlopa kilistázza az összes magyar forint címletet, a jobb oszlop pedig, hogy adott címletből mennyi van.
#### Módosítás
A címleteket módosítani a jobb felső sarokban látható "Módosítás" feliratú gombra kattintva lehet. Ha rákattintasz, akkor a gomb átalakul két másik gombbá. A baloldalira az van írva, hogy "Mégsem", a jobboldalira az, hogy "Mentés". A "Módosítás" feliratú gomb megnyomása után továbbá megváltozik az alattuk lévő táblázat is. Most be lehet ütni a jobb oldali oszlopba, hogy melyik címletből mennyit tartson az alkalmazás nyilván. Ha mindegyikhez beütötted a megfelelő mennyiséget és el akarod menteni amit módosítottál, akkor nyomj a jobb felső sarokban található "Mentés" feliratú gombra. Ha mégsem szeretnéd megtartani a módosításokat, akkor válaszd a "Mégsem" feliratú gombot. Ha a "Mégsem" feliratú gombot nyomod meg, akkor az eredeti verzió fog visszaállni, és a változtatásaid elvesznek. Ha megnyomod az escape billentyűt, akkor azzal ugyan azt éred el, mintha a "Mégsem" feliratú gombot választod.
### Eladások visszakeresése az irányítópulton
Az eladásokat visszakeresni az "Irányítópult" oldalon (/dashboard) tudsz. Az "Eladások" részben, ha nincsenek betöltve az események, akkor egy "Események betöltése" feliratú gomb látható. Az eseményeket betölteni az "Események betöltése" feliratú gomb megnyomásával tudod. Ha még nem történt eladás akkor a "Még nem történtek eladások!" felirat lesz látható. Ha valamiért nem sikerült betölteni az eladásokat, akkor a "Nem sikerült az eladásokat betölteni!" felirat lesz látható. Ha történtek eladások és sikerült őket betölteni, akkor az "Eladások betöltése" feliratú gomb át fog alakulni "Eladások újratöltése" feliratú gombbá, illetve a gomb alatt meg fognak jelenni az eddig történt eladások időrendi sorrendben (legújabb legfelül). Ha nagyon sok eladás történt, előfordulhat, hogy a betöltés eltart egy darabig! Az eladások listája nem tölt újra automatikusan, ha az újabb eladásokat is szeretnéd látni, akkor kattints a lista tetején látható "Eladások újratöltése" feliratú gombra. Az eladások mutatják alapesetben a címüknél, hogy kinek lett eladva (szervező, résztvevő, kivett), hogy mikor lett eladva, illetve, hogy az adott kosárban milyen termékek voltak, ennél több információért kattints minden eladás jobb felső sarkában látható "Részletek" feliratú gombra.
#### Az eladások részletei
Miután rákattintottál a "Részletek" feliratú gombra, fel fog ugrani egy ablak, ahol az eladás részleteit tekintheted meg. Legfelül középen láthatod, hogy mikor lett adott kosár eladva. Még mindig a felső részen, de a jobb oldalon láthatsz egy "x" feliratú gombot. Ha erre rákattintasz akkor a részletek ablak bezáródik. Az ablakot bezárhatod az escape billentyű lenyomásával is. Ha a kijelződ elég nagy, akkor az ablak lebegő módban fog megjelenni. Ilyenkor, ha a külső, sötét, átlátszó részre kattintasz, akkor is bezár az ablak. A cím alatt három főbb statisztika látható először:
- Eladás összprofitja: Az összes ilyenkor eladott termék eladásából származó bevétel és a beszerzési ár különbsége.
- Eladás összbevétele: Az összes ilyenkor eladott termék után kapott pénz. Az ELÁBÉ és a Profit összege.
- Eladva: Kinek lett eladva a kosár. (Résztvevőnek, Szervezőnek, Kivett).
Az összefoglaló statisztikák alatt látható két táblázat: Fizető címletek és visszajárócímletek. Ha nem volt fizető címlet, akkor a "Fizető címletek" táblázat nem fog megjelenni. Ha nem volt visszajáró címlet, akkor a "Visszajáró címletek" táblázat nem fog megjelenni. Mindkét táblázatnak két oszlopa van. A bal oldali oszlop mutatja, hogy milyen címletek vettek részt a tranzakcióban. Ha egy címlet nem vett részt egy tranzakcióban, akkor az nem jelenik meg. A jobb oldali oszlop pedig mutatja, hogy melyik címletből mennyi volt használva.
A címletezés után a termékek statisztikája jön. A termékstatisztika rész felső részén először látható a jelenleg látható termék neve. A termékek közt navigáláshoz használhatod a termékstatisztika két oldalán látható navigáló gombokat. Ugyan ezt elérheted a jobb vagy a bal nyíl billentyű lenyomásával is. A termék neve után van négy főbb statisztika:
- Eladás profitja: A jelen látható termék eladásából származó bevétel és a beszerzési ár különbsége.
- Összesen beszerzett: Hány lett beszerezve összesen a jelen látható termékből.
- Eladott mennyiség: Hány lett eladva a jelen látható termékből ebben a kosárban.
- Raktárban: A jelen látható termékből mennyi volt még a raktárban az eladás után.
A főbb statisztikák alatt vannak a változás statisztikái.
#### Eladáskori statisztikák
- Egység beszer. ár: Egység beszerzési ár. Egy ilyen termék beszerzési ára.
- Össz. beszer. ár: Összes beszerzési ár. Az összes ilyen termék beszerzési ára.
- Szervezői e. ár: Szervezői egység ár. Egy ilyen termék mennyibe kerül szervezőknek.
- Résztvevői e. ár: Résztvevői egység ár. Egy ilyen termék mennyibe kerül résztvevőknek.
- Szervezői hk.: Szervezői haszonkulcs. Mennyivel van megemelve a termék ára az Egység beszer. árhoz képest szervezőknek. A termék árát a következő képlettel számolja ki: `p = (n/a)*(1+(k/100))`, ahol `n` - a beszerzett mennyiség, `a` - a beszerzési ár, `k` - a megadott haszonkulcs, `p` - pedig a termék ára.
- Résztvevői hk.: Résztvevői haszonkulcs. Mennyivel van megemelve a termék ára az Egység beszer. árhoz képest résztvevőnek. A termék árát a következő képlettel számolja ki: `p = (n/a)*(1+(k/100))`, ahol `n` - a beszerzett mennyiség, `a` - a beszerzési ár, `k` - a megadott haszonkulcs, `p` - pedig a termék ára.
#### Eladás előtti statisztikák
- Raktárban: Mennyi ilyen termék volt raktárban eladás előtt.
- Szervezőnek eladott: Mennyi ilyen termék volt eladva szervezőknek az eladás előtt.
- Résztvevőnek eladott: Mennyi ilyen termék volt eladva résztvevőknek az eladás előtt.
- Összes eladott: Mennyi ilyen termék volt összesen eladva eladás előtt.
- Kivett: Mennyi ilyen termék volt kivéve eladás előtt.
- Szervezői össz. bevétel: Szervezői összes bevétel. Mennyi pénz jött be az ilyen termékek eladásából szervezőknek.
- Résztvevői össz. bevétel: Résztvevői összes bevétel. Mennyi pénz jött be az ilyen termékek eladásából résztvevőknek.
- Össz. bevétel: Az összes ilyen termék eladásából befolyó pénz összege eladás előtt.
- Profit: Az összes ilyen termék eladásából származó bevétel és a beszerzési ár különbsége eladás előtt.
#### Eladás utáni statisztikák
- Raktárban: Mennyi ilyen termék volt raktárban eladás után.
- Szervezőnek eladott: Mennyi ilyen termék volt eladva szervezőknek az eladás után.
- Résztvevőnek eladott: Mennyi ilyen termék volt eladva résztvevőknek az eladás után.
- Összes eladott: Mennyi ilyen termék volt összesen eladva eladás után.
- Kivett: Mennyi ilyen termék volt kivéve eladás után.
- Szervezői össz. bevétel: Szervezői összes bevétel. Mennyi pénz jött be az ilyen termékek eladásából szervezőknek.
- Résztvevői össz. bevétel: Résztvevői összes bevétel. Mennyi pénz jött be az ilyen termékek eladásából résztvevőknek.
- Össz. bevétel: Az összes ilyen termék eladásából befolyó pénz összege eladás után.
- Profit: Az összes ilyen termék eladásából származó bevétel és a beszerzési ár különbsége eladás után.
### Árlista működése
Az árlista az "Árlista" (/prices) oldalon érhető el. Ez az oldal arra való, hogy egy extra monitorra ki legyen rakva, és ez a monitor a vásárló felé néz. Az árlista oldalon minden hozzáadott termék meg fog jelenni a bal oldalon a jobb oldalon pedig az áruk. Ezt az árat is tudod módosítani a shift és a space egyidejű megnyomásával, vagy, ha nem ezen az oldalon vagy akkor a "Szervezői árlista" doboz pipálásával is. Az árlista akkor is frissülni fog, ha nem töltöd újra az oldalt, vagy, ha másik oldalról vagy akár másik eszközről változtatod meg az árakat. Továbbá az új termékek automatikusan hozzá lesznek adva a listához. Ha egy termék nevét beszerzési árát vagy haszonkulcsát módosítod, akkor a termék automatikusan frissülni fog. Ha egy terméket kitörölsz az automatikusan el fog tűnni. Ha egy termékből az összeset eladod akkor az a termék is automatikusan el fog tűnni. Ha több termék jelenik meg, mint 11, akkor automatikusan új oszlopban fogja megjeleníteni. Ha így még nem fér ki, vagy túl sok hely van a termékek alatt akkor ez a szám átállítható a "fitInOneCol" nevű változó megváltoztatásával.
## Verziók 
Ez jelenleg a büfés alkalmazás második iterációja.
Ebben a verzióban nincs szükség internetre, mert mindent helyileg tárol az alkalmazás.
Itt-ott lett optimalizálva egy-két dolog az előző iterációhoz képest,
illetve lett egy pár új kényelmi funkció is, mint például a kódbeolvasás.
A MARKET V-3-ra tekintettel jótanácsok:
- Mindent a saját komponensébe
- A Type-okat célszerű külön fájlba tárolni
- Kommentek
- A termék árát a kosárban a kosár ára alapján számítsa, ne pedig egyesével minden egyes terméknek legyen megadva az ára.
- QuickCheckout címletezés nélkül
- Személyreszabható árlista (Kategóriák)
- Qr kódos ár lista?
- Kiszállításos rendeléses dolog?
- Termék elrejtése ár listáról
- Legyen az adatbázis adatokból egy store ami eltárolja őket az adott session alatt és nem kell őket újra olvasni navigáláskor
## Bugok
- Az adatbázis van, hogy szar, ezért érdemes git-tel is figyelni főleg az adatbázistáblák változását