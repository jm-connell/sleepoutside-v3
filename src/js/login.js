import { renderHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

renderHeaderFooter();
let redirect = getParam("redirect");

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    login({ email, password }, redirect);
  });

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {});
