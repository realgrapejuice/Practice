const body = document.querySelector("body");

const IMG_NUM = 10;

const paintImage = (imgNumber) => {
  const image = new Image();
  image.src = `./assets/images/${imgNumber + 1}.jpg`;
  body.appendChild(image);
  image.classList.add("bgImage");
};

const genRandom = () => {
  const number = Math.floor(Math.random() * IMG_NUM);
  return number;
};

const initImage = () => {
  const randomNumber = genRandom();
  paintImage(randomNumber);
};

initImage();
