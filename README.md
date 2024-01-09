
## 🚀 About Me
Hi! My name is René. I'm a trainee to become a full stack developer.

My actual projects include HTML, CSS and JavaScript


# project_fakeShopAPI

### In diesem Mini-Project geht es darum, mittels FakeShopAPI eine Online Shop Seite mit JavaScript Filterfunktionen aufzubauen.


## Documentation

Der Aufbau des JavaScript Teils ist in 3 Dateien gestückelt.

    1. main.js
        Hier erfolgen die eigentlichen Funktionsaufrufe
    2. functions.js
        Hier sind Hilfsfunktionen ausgelagert
    3. variables.js
        Hier sind globale Variablen ausgelagert


Der Funktionskopf von main.js sieht so aus:

```
import { variables, button } from "./variables.js";
import { functions } from "./functions.js";
```
Es wird `type='module'`angewendet, um Variablen und Funktionen aus den beiden anderen Dateien anzubinden.

Die API für den Aufbau der Seite kommt von folgender Website:

https://fakestoreapi.com/

bzw. 

https://fakestoreapi.com/products

Eingebunden wird die API über folgenden Code:

```
async function initialBuild() {
    variables.productArr = await getAPI()
    console.log("* InitialBuildArr geladen*");
}
const getAPI = async () => {
    let returnArr = []
    try {
        await fetch('https://fakestoreapi.com/products?')
            .then((res) => res.json())
            .then((data) => {
                console.log("Data: ", data);

                returnArr = data
            })

        return returnArr
    } catch(error) {
        console.log(error);
        throw error
    }
}
```

Im Anschluss erfolgt eine Abfrage, ob in der Suchleiste Filter gesetzt wurden:
```
const getSort = () => {
    variables.optChoice = variables.selectStr.value

    buildSection(variables.productArr)
}
```

Ist die Auswahl in der Variablen `variables.optChoice` abgespeichert, erfolgt der Aufruf der Function `buildSection`.

Im Programmcode werden die Sortierungs `variables.optChoice` und Filter `variables.category` Paramter abgefragt und in entsprechenden Switch - Case - Anweisungen verschiedene Sortierungs,- und Filterfunktionen aufgerufen.

Bsp:

Sortierung Preis von hoch zu niedrig:
```
switch(optChoice) {
    [...]
    case "priceDown":
            arr.sort((a, b) => b.price - a.price)
            break;
    [...]
}
```
Filterfunktion nach Elektronikartikeln:
```
switch(filter) {
    [...]
    case "electronics":
            Arr = functions.filterElectronics(arr)
            functions.buildDiv(Arr)
            break;
    [...]
}
```
In der Funktion `functions.filterElectronics()` wird das `productArr` nach Übereinstimmungen in der Produktkategorie durchsucht. Ein neues Array mit übereinstimmenden Werten wird zurückgegeben.

Enthalten in functions.js:
```
export const functions = {
    [...],
    filterElectronics: (data) => {
        const filterArr = data.filter(el => el.category == "electronics")

        return filterArr
    },
    [...]
}
```
Des weiteren fibt es weitere Sortiermöglichkeiten:

    - sortieren nach Datensatz ID: Standard
    - sortieren Preis von niedrig zu hoch
    - sortieren Rating von hoch zu niedrig
    - sortieren Rating von niedrig zu hoch

und Filtermöglichkeiten:

    - filtern nach Schmuck
    - filtern nach Männerbekleidung
    - filtern nach Damenbekleidung


Sortier,- und Filtermöglichkeiten sind parallel, also zusammen nutzbar.






## Authors

- [@renehellmich](https://github.com/renehellmich)


## Demo

https://renehellmich.github.io/project_fakeShopAPI/




