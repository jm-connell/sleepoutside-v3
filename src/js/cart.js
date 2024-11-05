import { setLocalStorage, getLocalStorage, renderHeaderFooter } from './utils.mjs';
import ShoppingCart from './components/ShoppingCart.svelte';

renderHeaderFooter();

new ShoppingCart({
  target: document.querySelector('.products'),
});


