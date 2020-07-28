const container = document.querySelector(".js-image__container"),
  leftBtn = container.querySelector(".js-btn-left"),
  rightBtn = container.querySelector(".js-btn-right");

const imgArray = [
  "unsplash-1",
  "unsplash-2",
  "unsplash-3",
  "unsplash-4",
  "unsplash-5",
  "unsplash-6",
  "unsplash-7",
];
let counter = 1;

const leftEventHandler = () => {
  counter--;
  if (counter < 1) {
    counter = imgArray.length;
  }
  container.style.backgroundImage = `url('./assets/unsplash-${[counter]}.jpg')`;
};

const rightEventHnadler = () => {
  counter++;
  if (counter >= 1 && counter <= 7) {
    container.style.backgroundImage = `url('./assets/unsplash-${[
      counter,
    ]}.jpg')`;
  } else {
    counter = 1;
    container.style.backgroundImage = `url('./assets/unsplash-${[
      counter,
    ]}.jpg')`;
  }
};

const loadImage = () => {
  if (leftBtn.addEventListener("click", leftEventHandler)) {
  } else {
    rightBtn.addEventListener("click", rightEventHnadler);
  }
};

const initSlider = () => {
  loadImage();
};

initSlider();
