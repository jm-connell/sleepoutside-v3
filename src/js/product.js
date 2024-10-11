import { setLocalStorage, getLocalStorage, getParam } from './utils.mjs';
import { findProductById } from './productData.mjs';
import productDetails from "./productDetails.mjs";

const productId = getParam('product');
productDetails(productId, ".product-detail");

function addProductToCart(product) {
  let cartArray = getLocalStorage('so-cart')

  if (!Array.isArray(cartArray)) {
    cartArray = [];
  }
  cartArray.push(product);
  setLocalStorage('so-cart', cartArray);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}


// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
