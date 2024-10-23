<script>export let dataPromise;</script>


{#await dataPromise}
  <p>Loading</p>
{:then products}
<ul class="product-list">
{#each products as product}
  <li class="product-card">
    <a href="product_pages/index.html?product={product.Id}">
        <img
        src="{product.Image}"
        alt="Image of {product.Name}"/>
        <h3 class="card__brand">{product.Brand.Name}</h3>
        <h2 class="card__name">{product.NameWithoutBrand}</h2>
        <p class="product-card__price">${product.FinalPrice}</p></a>
    </li>
{/each}
</ul> 
{/await} 
