import ProductList from "./components/ProductList.svelte"
import { renderHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");

function getCategoryHeading(){

    const categoryHeadings = {
        tents: "Tents",
        backpacks: "Backpacks",
        "sleeping-bags": "Sleeping Bags",
        hammocks: "Hammocks"
    };
    
    return categoryHeadings[category];
    
}




new ProductList({
    target: document.querySelector(".products"),
    
    props: { category: category, categoryHeading: getCategoryHeading()},
});

renderHeaderFooter();


