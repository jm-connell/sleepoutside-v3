<script>
  import { getLocalStorage, getCartCount, calculateSubtotal } from "../utils.mjs"
  import { submitOrder, convertToJson } from "../productData.mjs"

    let tax = 0;
    let subtotal = 0;
    let shippingEstimate = 0;
    let total = 0;
    let itemCount = 0;

    function init() {
      calculateItemSummary();
    }

    function calculateItemSummary() {
      itemCount = getCartCount();
      subtotal = calculateSubtotal();
      shippingEstimate = Math.round(10 + (itemCount - 1) * 2, 2);
      tax = Math.round(subtotal * 0.06, 2);
      total = Math.round(subtotal + tax + shippingEstimate, 2);
    }

    function packageItems(items) {
      items.map(item => {
        return {
          id: item.id,
          name: item.name,
          quantity: 1,
          price: item.FinalPrice
        }
      })
    }

    function handleSubmit(e) {
      event.preventDefault();
      const json = convertToJson(this);
      json.orderDate = new Date();
      json.orderTotal = total;
      json.tax = tax;
      json.shippingEstimate = shippingEstimate;
      json.items = packageItems(getLocalStorage("so-cart"));

      return submitOrder(json);
    }
    
    init();
</script>

<form on:submit={handleSubmit}>
    <fieldset>
    <legend>Shipping</legend>
    <label for="first-name">First Name</label>
    <input type="text" name="fname" id="first-name" placeholder="First Name" required />

    <label for="last-name">Last Name</label>
    <input type="text" name="lname" id="last-name" placeholder="Last Name" required />

    <label for="street">Street</label>
    <input type="text" name="street" id="street" placeholder="Street" required />

    <label for="city">City</label>
    <input type="text" name="city" id="city" placeholder="City" required />

    <label for="state">State</label>
    <input type="text" name="state" id="state" placeholder="State" required />

    <label for="zip">Zip</label>
    <input type="text" name="zip" id="zip" placeholder="Zip" required />
  </fieldset>

  <fieldset>
    <legend>Payment</legend>
    <label for="card-number">Card Number</label>
    <input type="text" name="cardNumber" id="card-number" placeholder="Card Number" required />

    <label for="expiration">Expiration</label>
    <input type="text" name="expiration" id="expiration" placeholder="Expiration" required />

    <label for="security-code">Security Code</label>
    <input type="text" name="code" id="security-code" placeholder="Security Code" required />
  </fieldset>

  
  <fieldset>
      <legend>Order Summary</legend>
      <p>Item Subtotal: ${subtotal}</p>
      <p>Shipping Estimate: ${shippingEstimate}</p>
      <p>Tax: ${tax}</p>
      <p>Order Total: ${total}</p>
  </fieldset>

  <button type="submit" >Place Order</button>
  </form>