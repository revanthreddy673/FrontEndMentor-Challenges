"use strict";

const year = document.querySelector("#year");
const day = document.querySelector("#day");
const hour = document.querySelector("#hour");
const minute = document.querySelector("#minute");
const second = document.querySelector("#second");

const currentYear = new Date().getFullYear();

year.textContent = currentYear + 1;

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

//store day, hour, month values
let prevDayValue = 0;
let prevMinuteValue = 0;
let prevHourValue = 0;

function setValues() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  prevHourValue = h;
  prevMinuteValue = m;
  prevDayValue = d;

  // Add values to DOM
  day.textContent = d;
  hour.textContent = h < 10 ? "0" + h : h;
  minute.textContent = m < 10 ? "0" + m : m;
  second.textContent = s < 10 ? "0" + s : s;
}

function updateValues() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  if (prevDayValue == d) {
    day
      .closest(".counter-div")
      .querySelector(".top")
      .classList.remove("change");
  } else {
    day.closest(".counter-div").querySelector(".top").classList.add("change");
  }

  if (prevMinuteValue == m) {
    minute
      .closest(".counter-div")
      .querySelector(".top")
      .classList.remove("change");
  } else {
    minute
      .closest(".counter-div")
      .querySelector(".top")
      .classList.add("change");
  }

  if (prevHourValue == h) {
    hour
      .closest(".counter-div")
      .querySelector(".top")
      .classList.remove("change");
  } else {
    hour.closest(".counter-div").querySelector(".top").classList.add("change");
  }

  prevHourValue = h;
  prevMinuteValue = m;
  prevDayValue = d;

  // Add values to DOM
  day.textContent = d;
  hour.textContent = h < 10 ? "0" + h : h;
  minute.textContent = m < 10 ? "0" + m : m;
  second.textContent = s < 10 ? "0" + s : s;
}

setValues();

setInterval(updateValues, 1000);
