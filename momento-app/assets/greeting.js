const greetingForm = document.querySelector(".js-greeting__form"),
  greetingInput = greetingForm.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  CLASS_showing = "showing";

const saveUsername = (name) => {
  localStorage.setItem(USER_LS, name);
};

const submitNameEventhandler = (event) => {
  event.preventDefault();
  const userName = greetingInput.value;
  greetingHTML(userName);
  saveUsername(userName);
};

const askName = () => {
  greetingForm.classList.add(CLASS_showing);
  greetingForm.addEventListener("submit", submitNameEventhandler);
};

const greetingHTML = (name) => {
  greetingForm.classList.remove(CLASS_showing);
  greeting.classList.add(CLASS_showing);
  greeting.innerText = `Hello ${name}`;
};

const loadUsername = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askName();
  } else {
    greetingHTML(currentUser);
  }
};

const initGreeting = () => {
  loadUsername();
};

initGreeting();
