let productData;

export default async function productDetails(productID, selector) {
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // add a listener to Add to Cart button
}

function addProductToCart(product) {
    let cartArray = getLocalStorage('so-cart')
    if (!cartArray) {
      cartArray = [];
    }
    cartArray.push(product);
    setLocalStorage('so-cart', cartArray);
  }

function productDetailsTemplate(product) {
    return `${product.Name}`;
}