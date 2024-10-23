<script>
  import { getLocalStorage, setLocalStorage } from "../utils.mjs";
  import { cartCount } from "../stores.mjs";

  
  let cartItems = getLocalStorage("so-cart") || [];

  function removeItemFromCart(index) {
    cartItems.splice(index, 1);
    
    setLocalStorage('so-cart', cartItems);
    
    cartItems = [...cartItems];

    cartCount.set(cartItems.length);
  }
</script>

<ul class="product-list">
  {#each cartItems as item, index} 
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <button
          class="remove-item"
          on:click={() => removeItemFromCart(index)}
          style="cursor: pointer; color: red; background-color: aqua; display: contents; margin-left: 10px; ">X</button>
        <img src={item.Image} alt={item.Name} />
      </a>
      <a href="#">
        <h2 class="card__name">{item.Name}</h2>
      </a>
      <p class="cart-card__color">{item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">${item.FinalPrice}</p>
    </li>
  {/each}
</ul>
