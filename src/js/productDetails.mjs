import { findProductById } from "./productData.mjs";
import { cartCount } from "./stores.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId, selector) {
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // add a listener to Add to Cart button
  product = await findProductById(productId);
  console.log('product ', product); 
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cartArray = getLocalStorage('so-cart')
  if (!cartArray) {
    cartArray = [];
  }
  cartArray.push(product);
  setLocalStorage('so-cart', cartArray);
  cartCount.set(cartArray.length);
}

function productDetailsTemplate(product) {
  return `<h3>${product.Brand.Name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${product.Image}"
    alt="${product.Name}"
  />
  <p class="product-card__price">$${product.FinalPrice}</p>
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">
  ${product.DescriptionHtmlSimple}
  </p>`;
}