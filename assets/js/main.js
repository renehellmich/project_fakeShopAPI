import { variables, button } from "./variables.js";
import { functions } from "./functions.js";

//lokale Variablen

// API Verbindung herstellen und Daten in Array laden
async function initialBuild() {
    variables.productArr = await getAPI()
    console.log("* InitialBuildArr geladen*");
}

/*
Mittels der async function wird sichergestellt, dass die Variable erst befüllt wird, wenn alle Befehle in getAPI() ausgeführt und abgeschlossen sind. Hier führt sorgt der Zusatz await innerhalb getAPI() for fetch(). Würde async - await nicht benutzt werden, würde die Variable variables.productArr nicht befüllt werden.
*/
const getAPI = async () => {
    let returnArr = []
    try {
        await fetch('https://fakestoreapi.com/products?')
            .then((res) => res.json())
            .then((data) => {
                console.log("Data: ", data);

                returnArr = data
            })

        // ? Kommentar: wie kann ich den return Befehl besser gestalten, so dass ich direkt sagen kann return data ohne den Umweg über die Variable returnArr? Danke!

        return returnArr
    } catch(error) {
        console.log(error);
        throw error
    }
}

// Hier wird der Sortierungswert abgerufen und in der dazugehörigen Variablen abgespeichert.
const getSort = () => {
    variables.optChoice = variables.selectStr.value

    buildSection(variables.productArr)
}

// === internal functions
/*
Hier erfolgt eine Zusammenführung der Variablen und Aufbau der Section in zwei switch - case Anweisungen.
1. switch(sort)
2. switch(filter)
in der switch(filter) Anweisung erfolgt auch die Generierung der identischen Div-Container mit den Werten aus dem sortierten und gefilterten Array.
*/
const buildSection = (arr) => {
    let optChoice = variables.optChoice
    let filter = variables.category
    let Arr = []
    functions.deleteProducts()

    // getAPI()
    console.log(" * Arr übergeben: *", arr);

    console.log(optChoice);
    switch (optChoice) {
        case "sortBy":
            arr.sort((a, b) => a.id - b.id)
            break;
        case "priceDown":
            arr.sort((a, b) => b.price - a.price)
            break;
        case "priceUp":
            arr.sort((a, b) => a.price - b.price)
            break;
        case "ratingDown":
            arr.sort((a, b) => b.rating.rate - a.rating.rate)
            break;
        case "ratingUp":
            arr.sort((a, b) => a.rating.rate - b.rating.rate)
            break;
    }
    console.log("Ausgabe Filter: ", filter);
    switch (filter) {
        case null:
            functions.buildDiv(arr)
            break;
        case "electronics":
            Arr = functions.filterElectronics(arr)
            functions.buildDiv(Arr)
            break;
        case "jewelery":
            Arr = functions.filterJewelery(arr)
            functions.buildDiv(Arr)
            break;
        case "men's clothing":
            Arr = functions.filterMens(arr)
            functions.buildDiv(Arr)
            break;
        case "women's clothing":
            Arr = functions.filterWomens(arr)
            functions.buildDiv(Arr)
            break;

    }

}

// Minifunktionen zum befüllen der Kategorievariablen

const getElectronics = () => {
    variables.category = "electronics"

    buildSection(variables.productArr)
}

const getJewelery = () => {
    variables.category = "jewelery"

    buildSection(variables.productArr)
}

const getMens = () => {
    variables.category = "men's clothing"

    buildSection(variables.productArr)
}

const getWomens = () => {
    variables.category = "women's clothing"

    buildSection(variables.productArr)
}

// Filter und Kategorieauswahl werden auf den Initialzustand gesetzt.

const resetAll = () => {
    variables.category = null
    variables.optChoice = variables.selectStr.children[0].value

    variables.selectStr.children[0].selected = true
    console.log(variables.selectStr.children[0].selected);

    variables.inputStr.value = null;
    

    buildSection(variables.productArr)
}

// Die Funktion wird bei jedem Tastenanschlag im Eingabefeld aufgerufen und filtert das Array nach der entsprechenden Eingabe.

const sortByKey = () => {
    const arr = functions.filterByKey(variables.productArr, variables.inputStr.value)
    buildSection(arr)
}


// ==== functions Aufrufe
console.log("=== Initialisierung === ");
await initialBuild()
getSort();
buildSection(variables.productArr);

// OutputSection
variables.inputStr.addEventListener("keydown", sortByKey)
variables.selectStr.addEventListener("change", getSort)
button.btElectronics.addEventListener("click", getElectronics)
button.btJewelery.addEventListener("click", getJewelery)
button.btMen.addEventListener("click", getMens)
button.btWomen.addEventListener("click", getWomens)
button.betReset.addEventListener("click", resetAll)