"use strict";

const btnElem = document.querySelector("button");
const inputElem = document.querySelector("input");
const alertImg = document.querySelector(".alert-icon");
const alertMsg = document.querySelector(".alert-msg");

btnElem.addEventListener("click", function () {
  console.log(inputElem.validity);
  if (inputElem.validity.valid) {
    alertImg.classList.add("hidden");
    alertMsg.classList.add("hidden");
  } else {
    alertImg.classList.remove("hidden");
    alertMsg.classList.remove("hidden");
  }
});
