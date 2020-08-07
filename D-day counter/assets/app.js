const ddForm = document.querySelector("form"),
  ddStart = ddForm.querySelector("#startDate"),
  ddEnd = ddForm.querySelector("#endDate"),
  ddDescInfo = ddForm.querySelector("#descEvent"),
  ddUl = document.querySelector(".container_list");

const loadList = (item) => {};

const inputDateConverter = (startDate, endDate) => {};

const submitEventHandler = (event) => {
  event.preventDefault();
  const userInputStart = ddStart.value.split("-");
  const userInputEnd = ddEnd.value.split("-");
  const currentDD = ddDescInfo.value;
  const li = document.createElement("li");
  const span = document.createElement("span");
  ddUl.appendChild(li);
  li.innerText = currentDD;
  console.log(userInputStart, userInputEnd);
};

const init = () => {
  ddForm.addEventListener("submit", submitEventHandler);
};

init();
