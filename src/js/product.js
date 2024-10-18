import { setLocalStorage, getLocalStorage, getParam, renderHeaderFooter } from './utils.mjs';
import { findProductById } from './productData.mjs';
import productDetails from "./productDetails.mjs";

const productId = getParam('product');
productDetails(productId, ".product-detail");

// function addProductToCart(product) {
//   let cartArray = getLocalStorage('so-cart')

//   if (!Array.isArray(cartArray)) {
//     cartArray = [];
//   }
//   cartArray.push(product);
//   setLocalStorage('so-cart', cartArray);
// }

// async function addToCartHandler() {
//   const product = await findProductById(productId);
//   addProductToCart(product);
// }

renderHeaderFooter();


// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
