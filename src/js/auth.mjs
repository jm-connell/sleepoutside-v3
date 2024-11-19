import { loginRequest } from "./productData.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds, redirect) {
  try {
    let token = await loginRequest(creds);
    console.log(token);
    setLocalStorage(tokenKey, token);
  } catch (err) {
    alertMessage(err.message);
  }
}

export function checkLogin() {
  let token = getLocalStorage(tokenKey);

  console.log(token);
  const valid = isTokenValid(token.accessToken);
  if (!valid) {
    localStorage.removeItem(tokenKey);
    const location = window.location;
    window.location = `/login/index.html?redirect=${location.pathname}`;
    console.log("token expired, redirecting...");
  } else return token.accessToken;
}

export function isTokenValid(token) {
  if (token) {
    const decoded = jwtDecode(token);
    let currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log("Token is expired");
      return false;
    } else {
      console.log("Token is valid");
      return true;
    }
  } else return false;
}
