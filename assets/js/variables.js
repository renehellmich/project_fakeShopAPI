export let variables = {
    inputStr: document.querySelector("#searchString"),
    selectStr: document.querySelector("#sortBy"),
    outputSection: document.querySelector("#sectionArticle"),

    optChoice: null,
    category: null,
    productArr: []
}

export const button = {
    btElectronics: document.querySelector("#buttonElectronics"),
    btJewelery: document.querySelector("#buttonJewelery"),
    btMen: document.querySelector("#buttonMen"),
    btWomen: document.querySelector("#buttonWomen")
}