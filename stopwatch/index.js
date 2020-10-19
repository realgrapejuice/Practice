"use strict";

const timeBoard = document.querySelector(".stopwatch__timer");
const startBtn = document.querySelector(".start_btn");
const stopBtn = document.querySelector(".stop_btn");
const resetBtn = document.querySelector(".reset_btn");

let time = 0;
let second = 0;
let milSec = 0;
let interval = null;

function startTimer() {
  time++;
  if (time % 100 === 0) {
    second++;
  }
  milSec = time % 100;
  timeBoard.textContent = `${second}:${milSec < 10 ? `0${milSec}` : milSec}`;
}

function resetTimerText() {
  time = 0;
  second = 0;
  milSec = 0;
  timeBoard.innerHTML = `00:00`;
}

startBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
});

stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  updateRecordList();
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  resetTimerText();
});
