"use strict";

const emailInput = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  if (emailInput.value.length === 0 || !validateEmail(emailInput.value)) {
    emailInput.closest(".input-div").classList.add("error");
    errorMsg.style.display = "block";
  } else {
    emailInput.closest(".input-div").classList.remove("error");
    errorMsg.style.display = "none";
  }
});

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
