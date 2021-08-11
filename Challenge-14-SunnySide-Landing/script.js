"use strict";

const navBar = document.querySelector(".nav-bar");
const navIcon = document.querySelector(".nav-icon");
const mobileNav = document.querySelector(".mobile-nav");
const navBarList = document.querySelector(".nav-bar-list");
const footerList = document.querySelector(".nav-list");
const mobileNavBar = document.querySelector(".mobile-nav-list");
const servicesSection = document.querySelector("#services-section");
const projectSection = document.querySelector("#projectSC");
const contactSection = document.querySelector("#contactFr");
const headerSection = document.querySelector("#headerFc");

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

    navBarList.addEventListener("click", this._scrollListener.bind(this));

    footerList.addEventListener("click", this._scrollListener.bind(this));

    mobileNavBar.addEventListener("click", this._scrollListener.bind(this));
  }

  _scrollListener(event) {
    console.log(event);
    event.preventDefault();
    if (event.target.textContent.toLowerCase() == "Services".toLowerCase()) {
      const positions = servicesSection.getBoundingClientRect();
      window.scrollTo({
        left: positions.left + window.pageXOffset,
        top: positions.top + window.pageYOffset,
        behavior: "smooth",
      });
    } else if (
      event.target.textContent.toLowerCase() == "Projects".toLowerCase()
    ) {
      const positions = projectSection.getBoundingClientRect();
      window.scrollTo({
        left: positions.left + window.pageXOffset,
        top: positions.top + window.pageYOffset,
        behavior: "smooth",
      });
    } else if (
      event.target.textContent.toLowerCase() == "Contact".toLowerCase()
    ) {
      const positions = contactSection.getBoundingClientRect();
      window.scrollTo({
        left: positions.left + window.pageXOffset,
        top: positions.top + window.pageYOffset,
        behavior: "smooth",
      });
    } else if (
      event.target.textContent.toLowerCase() == "About".toLowerCase()
    ) {
      const positions = headerSection.getBoundingClientRect();
      window.scrollTo({
        left: positions.left + window.pageXOffset,
        top: positions.top + window.pageYOffset,
        behavior: "smooth",
      });
    }
  }

  _desktopinit() {
    navBar.classList.remove("out-of-view");
    navIcon.classList.add("out-of-view");
    mobileNav.classList.add("nav-out-of-view");
  }

  _mobileinit() {
    navBar.classList.add("out-of-view");
    navIcon.classList.remove("out-of-view");
    mobileNav.classList.add("nav-out-of-view");
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
