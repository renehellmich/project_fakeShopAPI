import { variables } from "./variables.js";

export const functions = {
    deleteProducts: () => {
        variables.outputSection.innerHTML = "";
    },
    buildDiv: (data) => {
        data.forEach(el => {
            variables.outputSection.innerHTML += `
                <div class='divProduct'>
                <img src='${el.image}' alt='' class='divImg'>
                <p class='pProductDescription'>${el.title}</p>
                <hr>
                <div class='divProductFooter'>
                    <p class='pFooterPrice'>${el.price}$</p>
                    <button type='button' class='divProductButton'>Add to Chart</button>
                </div>
            </div>
            `
        });
    },
    filterElectronics: (data) => {
        const filterArr = data.filter(el => el.category == "electronics")

        return filterArr
    },
    filterJewelery: (data) => {
        const filterArr = data.filter(el => el.category == "jewelery")
    },
    filterMens: (data) => {
        const filterArr = data.filter(el => el.category == "men's clothes")
    },
    filterWomens: (data) => {
        const filterArr = data.filter(el => el.category == "women's clothes")
    }
    
}