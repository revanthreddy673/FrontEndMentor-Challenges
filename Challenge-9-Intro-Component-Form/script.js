"use strict";

const inputFields = document.querySelectorAll("input");

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  inputFields.forEach((elem) => {
    if (elem.value.length === 0) {
      console.log("Empty");
      showElements(elem);
    } else if (
      elem.placeholder.toLowerCase() === "email address" &&
      !validateEmail(elem.value)
    ) {
      console.log("not valid");
      showElements(elem);
    } else {
      hideElements(elem);
    }
  });
});

function hideElements(elem) {
  elem.nextElementSibling.classList.add("hidden");
  elem.closest(".input-field").nextElementSibling.classList.add("hidden");
}

function showElements(elem) {
  elem.nextElementSibling.classList.remove("hidden");
  elem.closest(".input-field").nextElementSibling.classList.remove("hidden");
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
