<script>
  export let dataPromise;

  const discountPercent = (SuggestedRetailPrice, finalPrice) => {
    return Math.round(
      ((SuggestedRetailPrice - finalPrice) / SuggestedRetailPrice) * 100,
    );
  };
</script>

{#await dataPromise}
  <p>Loading</p>
{:then products}
  <ul class="product-list">
    {#each products as product}
      <li class="product-card">
        <a href="/product_pages/index.html?product={product.Id}">
          <img
            src={product.Images.PrimaryMedium}
            alt="Image of {product.Name}"
          />
          <h3 class="card__brand">{product.Brand.Name}</h3>
          <h2 class="card__name">{product.NameWithoutBrand}</h2>
          <p class="product-card__price">${product.FinalPrice}</p>
          <p class="product-card__price" id="discount">
            {discountPercent(
              product.SuggestedRetailPrice,
              product.FinalPrice,
            )}%OFF
          </p></a
        >
      </li>
    {/each}
  </ul>
  <!-- {:catch error}
  <p id="notFound">{error.message || "Unable to retrieve data"}</p> -->
{/await}

<style>
  #discount {
    color: orange;
    background-color: snow;
  }
</style>
