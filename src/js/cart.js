import { setLocalStorage, getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  document.querySelector('.product-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
      const productId = event.target.getAttribute('data-id');
      removeItemFromCart(productId);
    }
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
  <span class="remove-item" data-id="${item.Id}" style="cursor: pointer; color: red;">X</span>
  <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeItemFromCart(productId) {
  let cartItems = getLocalStorage('so-cart');
  cartItems = cartItems.filter(item => item.Id !== productId);

  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}

renderCartContents();
