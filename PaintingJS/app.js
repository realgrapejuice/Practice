"use strict";

const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext("2d");
const colorBtn = document.querySelectorAll(".color_item");
const colorArr = Array.from(colorBtn);
const rangeControl = document.querySelector("#js-range");
const paintBtn = document.querySelector(".paint");

canvas.width = 650;
canvas.height = 650;

ctx.strokeStyle = "#222f3e";
ctx.lineWidth = 2.5;

let painting = false;

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

const mouseMoveEventHandler = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const colorBtnEventHandler = (event) => {
  const target = event.target;
  console.log(target.style);
  if (target.classList.contains("red")) {
    ctx.strokeStyle = "#ee5253";
  } else if (target.classList.contains("orange")) {
    ctx.strokeStyle = "#ff9f43";
  } else if (target.classList.contains("pink")) {
    ctx.strokeStyle = "#ff9ff3";
  } else if (target.classList.contains("mint")) {
    ctx.strokeStyle = "#00d2d3";
  } else if (target.classList.contains("deep-blue")) {
    ctx.strokeStyle = "#341f97";
  } else if (target.classList.contains("gray")) {
    ctx.strokeStyle = "#8395a7";
  } else if (target.classList.contains("green")) {
    ctx.strokeStyle = "#1dd1a1";
  } else if (target.classList.contains("black")) {
    ctx.strokeStyle = "#222f3e";
  } else if (target.classList.contains("light-blue")) {
    ctx.strokeStyle = "#2e86de";
  }
};

const linewidthEventHandler = (event) => {
  const range = event.target.value;
  ctx.lineWidth = range;
};

if (canvas) {
  canvas.addEventListener("mousemove", mouseMoveEventHandler);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

colorArr.forEach((color) => {
  color.addEventListener("click", colorBtnEventHandler);
});

if (rangeControl) {
  rangeControl.addEventListener("input", linewidthEventHandler);
}
