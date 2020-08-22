const ddForm = document.querySelector("form"),
  ddEnd = ddForm.querySelector("#endDate"),
  ddInput = ddForm.querySelector("#descEvent"),
  ddDiv = document.querySelector(".js-event_container");

const END_DATE = "endDate";
const endArray = [];

const getItemObj = (day) => {
  return {
    id: String(Date.now()),
    day,
    desc: ddInput.value,
  };
};

const saveItemObj = (obj) => {
  endArray.push(obj);
};

const getDistance = () => {
  const now = String(new Date().getTime());
  const end = String(new Date(ddEnd.value).getTime());
  const distance = parseInt(end) - parseInt(now);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours = Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((distance / (1000 * 60)) % 60),
    seconds = Math.floor((distance / 1000) % 60);
  this.p.innerText = `${days < 10 ? `0${days}` : days}D ${
    hours < 10 ? `0${hours}` : hours
  }H ${minutes < 10 ? `0${minutes}` : minutes}M ${
    seconds < 10 ? `0${seconds}` : seconds
  }S`;
};

const buildGeneralDiv = (obj) => {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const delBtn = document.createElement("button");
  div.id = obj.id;
  h3.classList.add("event_title");
  h3.innerText = obj.desc;
  delBtn.innerText = `Delete`;
  div.append(delBtn, h3);
  return div;
};

//setInterval를 이용해서 시간을 업데이트 하는 과정 중에 종료함(2020.08.23)
const paintEventContainer = (obj) => {
  const generalDiv = buildGeneralDiv(obj);
  const p = document.createElement("p");
  p.classList.add("event_countInfo");
  setInterval(function () {
    const now = String(new Date().getTime());
    const end = String(new Date(ddEnd.value).getTime());
    const distance = parseInt(end) - parseInt(now);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours = Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((distance / (1000 * 60)) % 60),
      seconds = Math.floor((distance / 1000) % 60);
    this.p.innerText = `${days < 10 ? `0${days}` : days}D ${
      hours < 10 ? `0${hours}` : hours
    }H ${minutes < 10 ? `0${minutes}` : minutes}M ${
      seconds < 10 ? `0${seconds}` : seconds
    }S`;
  }, 1000);
  generalDiv.append(p);
  ddDiv.append(generalDiv);
  debugger;
};

const submitEventHandler = (event) => {
  event.preventDefault();
  const dayObj = getItemObj();
  setInterval(getDistance, 1000, dayObj);
  paintEventContainer(dayObj);
  saveItemObj(dayObj);
};

const init = () => {
  ddForm.addEventListener("submit", submitEventHandler);
};
init();
