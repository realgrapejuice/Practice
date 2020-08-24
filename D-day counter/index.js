const ddForm = document.querySelector("form"),
  ddEnd = ddForm.querySelector("#endDate"),
  ddInput = ddForm.querySelector("#descEvent"),
  ddDiv = document.querySelector(".js-event_container");

const END_DATE = "endDate";
let endArray = [];

const getDayObj = (obj) => {
  const objId = endArray.length + 1;
  const dayObj = {
    id: objId,
    day: ddEnd.value,
    desc: ddInput.value,
  };
  return dayObj;
};

const pushObjToArray = (obj) => {
  endArray.push(obj);
};

const delEventHandler = (event) => {
  const div = event.target.parentNode;
  div.parentNode.removeChild(div);
  const cleanList = endArray.filter(function (obj) {
    return obj.id !== parseInt(div.id);
  });
  endArray = cleanList;
  saveState();
};

const buildGeneralDiv = (obj) => {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const delBtn = document.createElement("button");
  div.id = obj.id;
  h3.classList.add("event_title");
  h3.innerText = obj.desc;
  delBtn.innerText = `Delete`;
  delBtn.addEventListener("click", delEventHandler);
  div.append(delBtn, h3);
  return div;
};

const paintEventContainer = (obj) => {
  const generalDiv = buildGeneralDiv(obj);
  const p = document.createElement("p");
  p.classList.add("event_countInfo");
  setInterval(() => {
    const now = String(new Date().getTime());
    const end = new Date(obj.day).getTime();
    const distance = parseInt(end) - parseInt(now);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours = Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((distance / (1000 * 60)) % 60),
      seconds = Math.floor((distance / 1000) % 60);
    p.innerText = `${days < 10 ? `0${days}` : days}D ${
      hours < 10 ? `0${hours}` : hours
    }H ${minutes < 10 ? `0${minutes}` : minutes}M ${
      seconds < 10 ? `0${seconds}` : seconds
    }S`;
  }, 1000);
  generalDiv.append(p);
  ddDiv.append(generalDiv);
  pushObjToArray(obj);
};

const submitEventHandler = (event) => {
  event.preventDefault();
  const dayObj = getDayObj(ddInput.value);
  paintEventContainer(dayObj);
  ddEnd.value = "";
  ddInput.value = "";
  saveState();
};

const saveState = () => {
  localStorage.setItem(END_DATE, JSON.stringify(endArray));
};

const loadState = () => {
  const currentList = localStorage.getItem(END_DATE);
  const parseList = JSON.parse(currentList);
  parseList.forEach(function (obj) {
    paintEventContainer(obj);
  });
};

const init = () => {
  loadState();
  ddForm.addEventListener("submit", submitEventHandler);
};
init();
