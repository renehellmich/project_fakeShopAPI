import { variables, button } from "./variables.js";
import { functions } from "./functions.js";

//lokale Variablen

// API Verbindung herstellen und Daten in Array laden
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

                /*
                // variables.productArr = [...data]
                // buildSection(variables.productArr)

                // console.log("Initial ProductArr: ", variables.productArr);
                */
                returnArr = data
            })

        // ? Kommentar: wie kann ich den return Befehl besser gestalten, so dass ich direkt sagen kann return data ohne den Umweg über die Variable returnArr? Danke!

        return returnArr
    } catch(error) {
        console.log(error);
        throw error
    }
}

const getSort = () => {
    variables.optChoice = variables.selectStr.value

    buildSection(variables.productArr)
}

//internal function
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

const resetAll = () => {
    variables.category = null
    variables.optChoice = variables.selectStr.children[0].value

    variables.selectStr.children[0].selected = true
    console.log(variables.selectStr.children[0].selected);

    variables.inputStr.value = null;
    

    buildSection(variables.productArr)
}

const sortByKey = () => {
    const arr = functions.filterByKey(variables.productArr, variables.inputStr.value)
    buildSection(arr)
}


// ==== functions Aufrufe
console.log("=== Initialisierung === ");
await initialBuild()
// getAPI();
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