"use strict";

document.querySelector(".share-btn").addEventListener("click", function () {
  if (document.querySelector("body").offsetWidth <= 700) {
    document.querySelector(".pop-up").classList.remove("desktop");
    document.querySelector(".pop-up").classList.add("mobile");
    document.querySelector(".pop-up").classList.toggle("hidden");
    document.querySelector(".share-btn-pop-up").classList.remove("btn-hidden");
  } else {
    document.querySelector(".pop-up").classList.remove("mobile");
    document.querySelector(".pop-up").classList.add("desktop");
    document.querySelector(".pop-up").classList.toggle("hidden");
    document.querySelector(".share-btn-pop-up").classList.add("btn-hidden");
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth >= 700) {
    document.querySelector(".pop-up").classList.remove("mobile");
    document.querySelector(".pop-up").classList.add("desktop");
    document.querySelector(".pop-up").classList.add("hidden");
    document.querySelector(".share-btn-pop-up").classList.add("btn-hidden");
  }
});
