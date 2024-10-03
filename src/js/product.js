import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';

function addProductToCart(product) {
  let cartArray = getLocalStorage('so-cart')
  if (!cartArray) {
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
