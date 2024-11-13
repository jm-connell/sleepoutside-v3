import { findProductById } from "./productData.mjs";
import { cartCount } from "./stores.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};
let errorMessage = "";

export default async function productDetails(productId, selector) {
  product = await findProductById(productId);

  if (!product || !product.NameWithoutBrand) {
    errorMessage = "Error 404 Product Not Found";
    product = {};
  }

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
  let discount = product.SuggestedRetailPrice - product.FinalPrice;
  let roundedDiscount = Math.round(discount * 100) / 100;

  if (errorMessage) {
    return `<p class="error-message">${errorMessage}</p>`;
  }

  return `<h3>${product.Brand.Name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${product.Images.PrimaryLarge}"
    alt="${product.Name}"
  />
  <p class="product-retail_price">Original Price: <s>$${product.SuggestedRetailPrice}</s></p>
  <p class="product-card__price">Final Price: $${product.FinalPrice}</p>
  <p class="product_discount">Total Savings: $${roundedDiscount}</p>
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">
  ${product.DescriptionHtmlSimple}
  </p>
  <h2 class="divider"></h2>
  <div class="product-detail__add">
    <button id="addToCart">Add to Cart</button>
  </div>`;
}