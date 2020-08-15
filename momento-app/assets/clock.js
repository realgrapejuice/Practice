const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("p");

const getTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${year}/${month}/${day} ${
    hours < 10 ? `0${hours}` : hours
  }:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};

let initClock = () => {
  setInterval(getTime, 1000);
};

initClock();
