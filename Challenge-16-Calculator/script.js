"use strict";

let currentTheme;
const body = document.querySelector("body");
const container = document.querySelector(".container");
const toggleTheme1 = document.querySelector(".theme1-toggle");
const toggleTheme2 = document.querySelector(".theme2-toggle");
const toggleTheme3 = document.querySelector(".theme3-toggle");
const result = document.querySelector(".result");
const keysBtns = document.querySelectorAll(".key");
const alertContainer = document.querySelector(".alert-container");
const okBtn = document.querySelector(".ok");

class App {
  numbersArr = [];
  resultCalc = 0;
  showAlert;

  constructor() {
    this._init();
    toggleTheme1.addEventListener("click", this.changetoTheme1);
    toggleTheme2.addEventListener("click", this.changetoTheme2);
    toggleTheme3.addEventListener("click", this.changetoTheme3);
    keysBtns.forEach((elem) =>
      elem.addEventListener("click", this.keysclicked.bind(this))
    );
    okBtn.addEventListener("click", this.hideAlertContainer.bind(this));
  }

  hideAlertContainer() {
    this.showAlert = false;
    this.showAlertContainer();
  }

  keysclicked(event) {
    console.log(event);
    console.log(event.target);
    event.target.style.transform = "translateY(5px)";
    setTimeout(() => {
      event.target.style.transform = "translateY(0px)";
    }, 100);
    console.log(this);
    if (event.target.textContent.toLowerCase() === "reset".toLowerCase()) {
      this.resetBtnClicked();
    } else if (event.target.textContent === "=") {
      this.equalBtnClicked();
    } else if (event.target.textContent.toLowerCase() === "del".toLowerCase()) {
      this.delBtnClicked();
    } else {
      this.numbersClicked(event.target.textContent);
    }
  }

  numbersClicked(content) {
    this.numbersArr.push(content);
    this.numbersArrJoin();
    this.showResult();
  }

  equalBtnClicked() {
    this.calculateResult();
    this.showResult();
  }

  resetBtnClicked() {
    this.resultCalc = 0;
    this.numbersArr = [];
    this.showResult();
  }

  delBtnClicked() {
    this.numbersArr.pop();
    if (this.numbersArr.length > 0) {
      this.numbersArrJoin();
    }
    if (this.numbersArr.length === 0) {
      this.resultCalc = 0;
    }
    this.showResult();
  }

  numbersArrJoin() {
    this.resultCalc = this.numbersArr.join("");
  }

  showResult() {
    result.textContent = this.resultCalc;
  }

  calculateResult() {
    if (this.numbersArr[0] === "/" || this.numbersArr[0] === "x") {
      this.showAlert = true;
      this.showAlertContainer();
      return;
    }
    if (this.numbersArr[0] === "+") {
      this.numbersArr.shift();
    }
    //before and after dot should always be number
    if (this.getDotIndex() !== -1) {
      if (!this.checkBeforandAfterDot(this.getDotIndex())) {
        this.showAlert = true;
        this.showAlertContainer();
        return;
      }
    }
    const calc = new Calculator();
    this.resultCalc = calc.evaluate(this.numbersArr.join(""));
    this.resultCalc = this.resultCalc.toFixed(2);
    this.numbersArr = [];
    this.numbersArr.push(this.resultCalc);
  }

  showAlertContainer() {
    this.showResult();
    if (this.showAlert) {
      alertContainer.classList.remove("hidden");
    } else {
      alertContainer.classList.add("hidden");
    }
  }

  changetoTheme1() {
    body.classList.remove(currentTheme);
    container.classList.remove(currentTheme);
    currentTheme = "theme1";
    localStorage.setItem("theme", currentTheme);
    body.classList.add(currentTheme);
    container.classList.add(currentTheme);
  }

  changetoTheme2() {
    body.classList.remove(currentTheme);
    container.classList.remove(currentTheme);
    currentTheme = "theme2";
    localStorage.setItem("theme", currentTheme);
    body.classList.add(currentTheme);
    container.classList.add(currentTheme);
  }

  changetoTheme3() {
    body.classList.remove(currentTheme);
    container.classList.remove(currentTheme);
    currentTheme = "theme3";
    localStorage.setItem("theme", currentTheme);
    body.classList.add(currentTheme);
    container.classList.add(currentTheme);
  }

  getDotIndex() {
    return this.numbersArr.indexOf(".");
  }

  checkBeforandAfterDot(index) {
    return (
      isNumber(this.numbersArr[index - 1]) &&
      isNumber(this.numbersArr[index + 1])
    );
  }

  _init() {
    if (localStorage.getItem("theme") == null) {
      currentTheme = "theme1";
      localStorage.setItem("theme", currentTheme);
    } else {
      currentTheme = localStorage.getItem("theme");
    }
    this.showAlert = false;
    body.classList.add(currentTheme);
    container.classList.add(currentTheme);
    this.showResult();
  }
}

const app = new App();

const Calculator = function () {
  this.evaluate = (string) => {
    string = string.replace(/ /g, "");
    console.log(string);
    if (Number(string) || string == 0) {
      return Number(string);
    } else {
      let arr = [];
      for (let i = 0; i < string.length; ) {
        if (
          string[i] === "+" ||
          string[i] === "-" ||
          string[i] === "x" ||
          string[i] === "/"
        ) {
          arr.push(string[i]);
          i++;
        } else {
          arr.push(
            Number(string.substring(i, getNumberTillNextOperator(string, i)))
          );
          i = getNumberTillNextOperator(string, i);
        }
      }
      let totalValue = 0;
      while (getMultiplyDivisionOperatorIndex(arr)) {
        let index = getMultiplyDivisionOperatorIndex(arr);
        if (arr[index] === "x") {
          totalValue = arr[index - 1] * arr[index + 1];
          arr.splice(index - 1, 3, totalValue);
        } else if (arr[index] === "/") {
          totalValue = arr[index - 1] / arr[index + 1];
          arr.splice(index - 1, 3, totalValue);
        }
      }
      while (getAddSubOperatorIndex(arr)) {
        let index = getAddSubOperatorIndex(arr);
        if (arr[index] === "+") {
          totalValue = arr[index - 1] + arr[index + 1];
          arr.splice(index - 1, 3, totalValue);
        } else if (arr[index] === "-") {
          totalValue = arr[index - 1] - arr[index + 1];
          arr.splice(index - 1, 3, totalValue);
        }
      }
      return totalValue;
    }
  };
};

function getMultiplyDivisionOperatorIndex(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "x" || arr[i] === "/") {
      return i;
    }
  }
}

function getAddSubOperatorIndex(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "+" || arr[i] === "-") {
      return i;
    }
  }
}

function getNumberTillNextOperator(str, index) {
  for (let i = index; i < str.length; i++) {
    if (Number(str[i]) || str[i] == 0 || str[i] == ".") {
      continue;
    } else {
      return i;
    }
  }
}

var isNumber = function isNumber(value) {
  return isFinite(value);
};
