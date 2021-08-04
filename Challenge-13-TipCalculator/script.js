"use strict";

/*
    tip amount / person= ((tip % * bill)/100) / total person;
    total bill / person = (bill + (tip % * bill)/100) / total person;
*/

const billInput = document.querySelector("#bill");
const personInput = document.querySelector("#person");
const customTipInput = document.querySelector(".custom-value");
const tipContainer = document.querySelector("#tip-value");
const totalValueContainer = document.querySelector("#total-value");
const billInputContainer = document.querySelector("#bill-input-holder");
const personInputContainer = document.querySelector("#person-input-holder");
const alertMsg = document.querySelector(".alert-msg");
const tipButtons = document.querySelectorAll(".btn");
const resetBtn = document.querySelector(".reset");

class App {
  billValue = 0;
  personCount;
  tipValue = 0;
  #totalTip;
  #totalAmount;
  tipPerPerson;
  amountPerPerson;

  constructor() {
    this.init();

    billInput.addEventListener("focusin", this._inputFocusListener);

    billInput.addEventListener("focusout", this._focusOutListener);

    billInput.addEventListener(
      "change",
      this._billInputValueListener.bind(this)
    );

    personInput.addEventListener("focusin", this._inputFocusListener);

    personInput.addEventListener("focusout", this._focusOutListener);

    personInput.addEventListener(
      "change",
      this._personInputValueListener.bind(this)
    );

    tipButtons.forEach((elem) => {
      elem.addEventListener("click", this._tipBtnClickListener.bind(this));
    });

    customTipInput.addEventListener(
      "focusin",
      this._customTipInputFocusListener
    );

    customTipInput.addEventListener("focusout", this._focusOutListener);

    customTipInput.addEventListener(
      "change",
      this._customTipInputValueListener.bind(this)
    );

    resetBtn.addEventListener("click", () => {
      this.init();
    });
  }

  init() {
    personInputContainer.classList.remove("error-active");
    this._focusOutListener();
    resetBtn.classList.remove("reset-active");
    tipButtons.forEach((elem) => {
      elem.classList.remove("btn-active");
    });
    billInput.value = "0";
    personInput.value = "0";
    customTipInput.value = "0";
    tipContainer.textContent = "$0.00";
    totalValueContainer.textContent = "$0.00";
  }

  _focusOutListener() {
    personInputContainer.classList.remove("input-active");
    billInputContainer.classList.remove("input-active");
    customTipInput.closest("div").classList.remove("input-active");
  }

  _inputFocusListener() {
    this.closest(".input-holder").classList.add("input-active");
  }

  _billInputValueListener(event) {
    console.log(event);
    console.log(this); // App
    billInputContainer.classList.remove("input-active");
    this.billValue = Number(event.target.value);
    if (this._checkPersonCount()) {
      return;
    }
    //operations
    this._operations();
  }

  _personInputValueListener(event) {
    if (Number(event.target.value) > 0) {
      alertMsg.style.display = "none";
      this.personCount = Number(event.target.value);
      personInputContainer.classList.remove("input-active");
      personInputContainer.classList.remove("error-active");
      //operations
      this._operations();
    } else {
      alertMsg.style.display = "block";
      event.target.closest(".input-holder").classList.add("error-active");
    }
  }

  _checkPersonCount() {
    if (!this.personCount) {
      alertMsg.style.display = "block";
      personInputContainer.classList.add("error-active");
      return true;
    }
    return false;
  }

  _tipBtnClickListener(event) {
    event.target.classList.add("btn-active");
    const value = event.target.textContent;
    this.tipValue = Number(value.substring(0, value.length - 1));
    if (this._checkPersonCount()) {
      return;
    }
    //operations
    this._operations();
  }

  _customTipInputFocusListener() {
    this.closest("div").classList.add("input-active");
  }

  _customTipInputValueListener(event) {
    event.target.closest("div").classList.remove("input-active");
    this.tipValue = Number(event.target.value);
    if (this._checkPersonCount()) {
      return;
    }
    //operations
    this._operations();
  }

  _operations() {
    //caculate total tip
    this._calculateTotalTip();
    //calculate total amount
    this._calculateTotalAmount();
    //show total and tip values
    this.showTipandTotalValues();
  }

  _calculateTotalTip() {
    this.#totalTip = (this.tipValue * this.billValue) / 100;
    this.tipPerPerson = this.#totalTip / this.personCount;
    this.tipPerPerson = this.tipPerPerson.toFixed(2);
  }

  _calculateTotalAmount() {
    this.#totalAmount = this.billValue + this.#totalTip;
    this.amountPerPerson = this.#totalAmount / this.personCount;
    this.amountPerPerson = this.amountPerPerson.toFixed(2);
  }

  showTipandTotalValues() {
    tipContainer.textContent = "$" + this.tipPerPerson;
    totalValueContainer.textContent = "$" + this.amountPerPerson;
    resetBtn.classList.add("reset-active");
  }
}

const app = new App();
