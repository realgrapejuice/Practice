const inputForm = document.querySelector(".game form"),
  inputUser = inputForm.querySelector("input"),
  monitor = document.querySelector(".result");

const winCounter = document.querySelector(".counter_win p"),
  loseCounter = document.querySelector(".counter_lose p"),
  totalCounter = document.querySelector(".counter_total p"),
  winRate = document.querySelector(".counter_winRate p");

const win = "You Win!",
  lose = "You Lose!",
  draw = "You Draw!",
  error = "Check your Input again!";

let winCount = 0,
  loseCount = 0,
  totalCount = 0;

const loadComputerChoice = () => {
  const getComputerChoice = Math.floor(Math.random() * 3);
  switch (getComputerChoice) {
    case 0:
      return "rock";
    case 1:
      return "scissor";
    default:
      return "paper";
  }
};

const counter = () => {
  if (monitor.innerText !== error) {
    totalCount++;
    totalCounter.innerText = totalCount;
    if (monitor.innerText === win) {
      winCount++;
      winCounter.innerText = winCount;
    } else if (monitor.innerText === lose) {
      loseCount++;
      loseCounter.innerText = loseCount;
    }
    winRate.innerText = `${Math.round((winCount / totalCount) * 100)}%`;
  }
};

const game = () => {
  const computer = loadComputerChoice();
  let input = inputUser.value;
  input = input.toLowerCase();
  inputUser.value = "";
  if (input === "rock" || input === "paper" || input === "scissor") {
    if (input === computer) {
      monitor.innerText = draw;
    }
    if (input === "rock") {
      if (computer === "paper") {
        monitor.innerText = lose;
      } else if (computer === "scissor") {
        monitor.innerText = win;
      }
    }
    if (input === "paper") {
      if (computer === "scissor") {
        monitor.innerText = lose;
      } else if (computer === "rock") {
        monitor.innerText = win;
      }
    }
    if (input === "scissor") {
      if (computer === "rock") {
        monitor.innerText = lose;
      } else if (computer === "paper") {
        monitor.innerText = win;
      }
    }
  } else {
    monitor.innerText = error;
  }
  counter();
};

const submitHandler = () => {
  inputForm.addEventListener("submit", game);
};

const init = () => {
  submitHandler();
};

init();
