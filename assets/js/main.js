import { variables, button } from "./variables.js";
import { functions } from "./functions.js";

//lokale Variablen

// API Verbindung herstellen
const getAPI = () => {
    
    fetch('https://fakestoreapi.com/products?')
        .then((res) => res.json())
        .then((data) => {
            console.log("Data: ", data);

            variables.productArr = data

            console.log("Initial ProductArr: ", variables.productArr);
            
        })
}

const getSort = () => {
    variables.optChoice = variables.selectStr.value
}

//internal function
const buildSection = () => {
    let optChoice = variables.optChoice
    let filter = variables.category
    let Arr = []
    functions.deleteProducts()

    console.log(variables.productArr);

    console.log(optChoice);
            switch (optChoice) {
                case "sortBy":
                    variables.productArr.sort((a, b) => a.id - b.id)
                    break;
                case "price":
                    variables.productArr.sort((a, b) => b.price - a.price)
                    break;
                case "rating":
                    variables.productArr.sort((a, b) => b.rating.rate - a.rating.rate)
            }

            switch (filter) {
                case null:
                    functions.buildDiv(variables.productArr)
                    break;
                case "electronics":
                    Arr = functions.filterElectronics(variables.productArr)
                    functions.buildDiv(Arr)
                    break;
                case "men's clothing":
                    break;
                case "women's clothing":
                    break;

            }

}

const getElectronics = () => {
    variables.category = "electronics"

    buildSection()
}


//functions Aufrufe
getAPI();
getSort();
buildSection();

// OutputSection
variables.selectStr.addEventListener("change", () => getSort)
button.btElectronics.addEventListener("click", () => getElectronics)
button.btJewelery.addEventListener("click", "")
button.btMen.addEventListener("click", "")
button.btWomen.addEventListener("click", "")