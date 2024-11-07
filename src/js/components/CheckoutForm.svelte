<script>
  import {
    getLocalStorage,
    getCartCount,
    calculateSubtotal,
    formDataToJson,
    alertMessage,
  } from "../utils.mjs";
  import { submitOrder } from "../productData.mjs";

  let tax = 0;
  let subtotal = 0;
  let shippingEstimate = 0;
  let total = 0;
  let itemCount = 0;
  let list = [];

  function init() {
    list = getLocalStorage("so-cart");
    calculateItemSummary();
  }

  function calculateItemSummary() {
    itemCount = getCartCount();
    subtotal = calculateSubtotal();
    shippingEstimate = Math.round(10 + (itemCount - 1) * 2, 2);
    tax = Math.round(subtotal * 0.06, 2);
    total = Math.round(subtotal + tax + shippingEstimate, 2);
  }

  const packageItems = function (items) {
    const simplifiedItems = items.map((item) => {
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  };

  async function handleSubmit(e) {
    event.preventDefault();
    const json = formDataToJson(this);
    json.orderDate = new Date();
    json.orderTotal = `${total}`;
    json.tax = `${tax}`;
    json.shipping = shippingEstimate;
    json.items = packageItems(list);
    console.log("ITEMS: ", json);

    try {
      const res = await submitOrder(json);
      console.log(res);
      location.assign("/success.html");
    } catch (err) {
      Object.values(err.message).forEach((msg) => alertMessage(msg));
    }
  }

  init();
</script>

<form on:submit={handleSubmit}>
  <fieldset>
    <legend>Shipping</legend>
    <label for="first-name">First Name</label>
    <input
      type="text"
      name="fname"
      id="first-name"
      placeholder="First Name"
      required
    />

    <label for="last-name">Last Name</label>
    <input
      type="text"
      name="lname"
      id="last-name"
      placeholder="Last Name"
      required
    />

    <label for="street">Street</label>
    <input
      type="text"
      name="street"
      id="street"
      placeholder="Street"
      required
    />

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
    <input
      type="text"
      name="cardNumber"
      id="card-number"
      placeholder="Card Number"
      required
    />

    <label for="expiration">Expiration</label>
    <input
      type="text"
      name="expiration"
      id="expiration"
      placeholder="Expiration"
      required
    />

    <label for="security-code">Security Code</label>
    <input
      type="text"
      name="code"
      id="security-code"
      placeholder="Security Code"
      required
    />
  </fieldset>

  <fieldset>
    <legend>Order Summary</legend>
    <p>Item Subtotal: ${subtotal}</p>
    <p>Shipping Estimate: ${shippingEstimate}</p>
    <p>Tax: ${tax}</p>
    <p>Order Total: ${total}</p>
  </fieldset>

  <button type="submit">Place Order</button>
</form>
