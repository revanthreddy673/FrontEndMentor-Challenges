"use strict";

document.querySelectorAll(".question-answer").forEach((elem) => {
  elem.addEventListener("click", function (event) {
    for (let i = 0; i < elem.childElementCount; i++) {
      rotateDownArrow(elem.children[i]);
      if (elem.children[i].classList.contains("answer")) {
        elem.children[i].classList.toggle("hidden");
      }
    }
  });
});

function rotateDownArrow(elem) {
  if (elem.childElementCount > 1) {
    if (elem.children[1].classList.contains("rotate")) {
      elem.children[0].style.fontWeight = 400;
      elem.children[1].classList.remove("rotate");
    } else {
      elem.children[0].style.fontWeight = 700;
      elem.children[1].classList.add("rotate");
    }
  }
}

window.addEventListener("resize", function (event) {
  console.log(window.outerWidth);
  console.log(window.innerWidth);
  if (window.innerWidth <= 700) {
    document
      .querySelector(".image-section")
      .children[0].children[0].setAttribute(
        "src",
        "images/illustration-woman-online-mobile.svg"
      );
    document.querySelector(".mailbox-img").classList.add("hidden");

    document
      .querySelector(".image-section")
      .children[0].classList.remove("illustration-img");
    document
      .querySelector(".image-section")
      .children[0].classList.add("illustration-img-mobile");
  } else {
    document
      .querySelector(".image-section")
      .children[0].children[0].setAttribute(
        "src",
        "images/illustration-woman-online-desktop.svg"
      );
    document.querySelector(".mailbox-img").classList.remove("hidden");

    document
      .querySelector(".image-section")
      .children[0].classList.remove("illustration-img-mobile");
    document
      .querySelector(".image-section")
      .children[0].classList.add("illustration-img");
  }
});
