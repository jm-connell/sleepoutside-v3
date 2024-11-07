import { alertMessage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

 export async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return await res.json();
  } else {
    throw { name: 'servicesError', message: jsonResponse }; 
  }
}

export async function getProductsByCategory(category = "tents") {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function submitOrder(order) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}


export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;  

}

