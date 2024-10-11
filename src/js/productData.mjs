function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}


export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}

export async function getDataWithImages(category = "tents") {
  const data = await fetch(`../json/${category}.json`).then(convertToJson);

  const validProducts = await Promise.all(
      data.map(async (product) => {
          const exists = await imageExists(product.Image);
          return exists ? product : null;
      })
  );

  return validProducts.filter(Boolean); 
}

async function imageExists(url) {
  return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
  });
}
