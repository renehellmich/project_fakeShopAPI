import { variables } from "./variables.js";

export const functions = {
    deleteProducts: () => {
        variables.outputSection.innerHTML = "";
    },
    buildDiv: (data) => {
        data.forEach(el => {
            variables.outputSection.innerHTML += `
                <div class='divProduct'>
                <figure class='imgContainer'>
                    <img src='${el.image}' alt='' class='divImg'>
                </figure>
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

        return filterArr
    },
    filterMens: (data) => {
        const filterArr = data.filter(el => el.category == "men's clothing")

        return filterArr
    },
    filterWomens: (data) => {
        const filterArr = data.filter(el => el.category == "women's clothing")

        return filterArr
    },
    filterByKey: (data, searchString) => {
        const filterArr = data.filter(el => el.title.includes(searchString))

        return filterArr
    }
    
}