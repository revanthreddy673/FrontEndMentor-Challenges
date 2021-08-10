"use strict";

const navBar = document.querySelector(".nav-bar");
const navIcon = document.querySelector(".nav-icon");
const mobileNav = document.querySelector(".mobile-nav");

class App {
  constructor() {
    if (window.innerWidth > 992) {
      this._desktopinit();
    } else {
      this._mobileinit();
    }
    window.addEventListener("resize", this.resizeListener.bind(this));

    navIcon.addEventListener("click", function () {
      mobileNav.classList.toggle("nav-out-of-view");
    });
  }

  _desktopinit() {
    navBar.classList.remove("out-of-view");
    navIcon.classList.add("out-of-view");
    mobileNav.classList.add("nav-out-of-view");
  }

  _mobileinit() {
    navBar.classList.add("out-of-view");
    navIcon.classList.remove("out-of-view");
    mobileNav.classList.remove("nav-out-of-view");
  }

  resizeListener() {
    if (window.innerWidth > 992) {
      this._desktopinit();
    } else {
      navBar.classList.add("out-of-view");
      navIcon.classList.remove("out-of-view");
    }
  }
}

const app = new App();
