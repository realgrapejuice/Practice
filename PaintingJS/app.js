"use strict";

//Variables
const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext("2d");

const colorBtn = document.querySelectorAll(".color_item");
const colorArr = Array.from(colorBtn);
const rangeControl = document.querySelector("#js-range");
const paintBtn = document.querySelector(".paint");
const clearBtn = document.querySelector(".clear");
const saveBtn = document.querySelector(".save");

//Canvas Size
const CANVAS_SIZE = 650;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//Default Linewidth
ctx.lineWidth = 2.5;

//Default Color
ctx.fillStyle = "#ffffff"; // save default backgroundcolor white
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // save default backgroundcolor white
const defaultColor = "#222f3e";
ctx.strokeStyle = defaultColor;
ctx.fillStyle = defaultColor;
paintBtn.style.backgroundColor = "rgba(255, 63, 52, 1)";

//Default boolean setting
let painting = false;
let filling = false;
const stopPainting = () => {
  painting = false;
};
const startPainting = () => {
  painting = true;
};

//Canvas mousemove setting
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

const handleCanvasClick = () => {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
};

const handleContextMenu = (event) => {
  event.preventDefault();
};

if (canvas) {
  canvas.addEventListener("mousemove", mouseMoveEventHandler);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

//Paint button setting
const handleModeClick = () => {
  if (filling === true) {
    filling = false;
    paintBtn.innerText = "Paint";
    paintBtn.style.backgroundColor = "rgba(255, 63, 52, 1)";
  } else {
    filling = true;
    paintBtn.innerText = "Fill";
    paintBtn.style.backgroundColor = "#00b894";
  }
};

if (paintBtn) {
  paintBtn.addEventListener("click", handleModeClick);
}

//Handle color palette
const handleColorClick = (event) => {
  const target = event.target;
  if (target.classList.contains("red")) {
    ctx.strokeStyle = "#ee5253";
    ctx.fillStyle = "#ee5253";
  } else if (target.classList.contains("orange")) {
    ctx.strokeStyle = "#ff9f43";
    ctx.fillStyle = "#ff9f43";
  } else if (target.classList.contains("pink")) {
    ctx.strokeStyle = "#ff9ff3";
    ctx.fillStyle = "#ff9ff3";
  } else if (target.classList.contains("mint")) {
    ctx.strokeStyle = "#00d2d3";
    ctx.fillStyle = "#00d2d3";
  } else if (target.classList.contains("deep-blue")) {
    ctx.strokeStyle = "#341f97";
    ctx.fillStyle = "#341f97";
  } else if (target.classList.contains("gray")) {
    ctx.strokeStyle = "#8395a7";
    ctx.fillStyle = "#8395a7";
  } else if (target.classList.contains("green")) {
    ctx.strokeStyle = "#1dd1a1";
    ctx.fillStyle = "#1dd1a1";
  } else if (target.classList.contains("black")) {
    ctx.strokeStyle = "#222f3e";
    ctx.fillStyle = "#222f3e";
  } else if (target.classList.contains("light-blue")) {
    ctx.strokeStyle = "#2e86de";
    ctx.fillStyle = "#2e86de";
  } else if (target.classList.contains("white")) {
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
  }
};
colorArr.forEach((color) => {
  color.addEventListener("click", handleColorClick);
});

//Handle line width range
const linewidthEventHandler = (event) => {
  const range = event.target.value;
  ctx.lineWidth = range;
};
if (rangeControl) {
  rangeControl.addEventListener("input", linewidthEventHandler);
}

//Handle clear all button
const clearAll = () => {
  location.reload(true);
};
if (clearBtn) {
  clearBtn.addEventListener("click", clearAll);
}

//Save canvas as image
const saveFile = () => {
  const image = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.href = image;
  link.download = "Paint_screenshot";
  link.click();
};
if (saveBtn) {
  saveBtn.addEventListener("click", saveFile);
}
