const canvas = document.querySelector("#js-canvas");

let painting = false;

const stopPainting = () => {
  painting = false;
};

const mouseMoveEventHandler = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  console.log(x, y);
};

const mouseDownEventHandler = (event) => {
  painting = true;
};

const mouseUpEventHandler = (event) => {
  stopPainting();
};

if (canvas) {
  canvas.addEventListener("mousemove", mouseMoveEventHandler);
  canvas.addEventListener("mousedown", mouseDownEventHandler);
  canvas.addEventListener("mouseup", mouseUpEventHandler);
  canvas.addEventListener("mouseleave", stopPainting);
}
