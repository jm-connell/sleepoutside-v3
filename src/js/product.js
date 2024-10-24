import { getParam, renderHeaderFooter } from './utils.mjs';
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
console.log(productId);
productDetails(productId, ".product-detail");

renderHeaderFooter();
