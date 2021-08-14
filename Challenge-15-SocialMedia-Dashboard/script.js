"use strict";

const mainText = document.querySelectorAll(".mainText");
const subText = document.querySelectorAll(".subText");
const toggleBtn = document.querySelector(".btn");
const cards = document.querySelectorAll(".card");
const body = document.querySelector("body");

class App {
  #lightMode;
  #darkMode;

  constructor() {
    this._init();
    toggleBtn.addEventListener(
      "click",
      this._togglingBtwnDarkandLight.bind(this)
    );
  }

  _init() {
    this.#lightMode = true;
    this.#darkMode = false;
    body.classList.add("lightBody");
    mainText.forEach((elem) => elem.classList.add("lightMainText"));
    subText.forEach((elem) => elem.classList.add("lightSubText"));
    toggleBtn.classList.add("toggleLight");
    cards.forEach((elem) => elem.classList.add("lightCardBg"));
  }

  _togglingBtwnDarkandLight() {
    if (this.#lightMode) {
      this.#lightMode = false;
      this.#darkMode = true;
      this._darkMode();
    } else if (this.#darkMode) {
      this.#darkMode = false;
      this.#lightMode = true;
      this._lightMode();
    }
  }

  _darkMode() {
    //change body bg to dark
    body.classList.remove("lightBody");
    body.classList.add("darkBody");
    //change the toggle
    toggleBtn.classList.remove("toggleLight");
    toggleBtn.classList.add("toggleDark");
    //change maintext
    mainText.forEach((elem) => elem.classList.remove("lightMainText"));
    mainText.forEach((elem) => elem.classList.add("darkMainText"));
    //change subtext
    subText.forEach((elem) => elem.classList.remove("lightSubText"));
    subText.forEach((elem) => elem.classList.add("darkSubText"));
    //change card background
    cards.forEach((elem) => elem.classList.remove("lightCardBg"));
    cards.forEach((elem) => elem.classList.add("darkCardBg"));
  }

  _lightMode() {
    //change body bg to light
    body.classList.remove("darkBody");
    body.classList.add("lightBody");
    //change the toggle
    toggleBtn.classList.remove("toggleDark");
    toggleBtn.classList.add("toggleLight");
    //change maintext
    mainText.forEach((elem) => elem.classList.remove("darkMainText"));
    mainText.forEach((elem) => elem.classList.add("lightMainText"));
    //change subtext
    subText.forEach((elem) => elem.classList.remove("darkSubText"));
    subText.forEach((elem) => elem.classList.add("lightSubText"));
    //change card background
    cards.forEach((elem) => elem.classList.remove("darkCardBg"));
    cards.forEach((elem) => elem.classList.add("lightCardBg"));
  }
}

const app = new App();
