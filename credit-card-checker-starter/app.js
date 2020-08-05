const section = document.querySelector(".validate_container"),
  checkForm = document.querySelector("form"),
  checkInput = checkForm.querySelector("input"),
  againBtn = document.querySelector(".resetBtn"),
  checkUl = document.querySelector(".card_info");

//Check company by using arr[0]
const companyCheck = (arr) => {
  const amex = "Amex (American Express)",
    visa = "Visa",
    mastercard = "Mastercard",
    bcGlobal = "BC globalr",
    local = "Local card";
  const li = document.createElement("li");
  checkUl.appendChild(li);

  const firstNum = arr[0];
  switch (firstNum) {
    case 3:
      li.innerText = `Company: ${amex}`;
      console.log(`Company: ${amex}`);
      break;
    case 4:
      li.innerText = `Company: ${visa}`;
      console.log(`Company: ${visa}`);
      break;
    case 5:
      li.innerText = `Company: ${mastercard}`;
      console.log(`Company: ${mastercard}`);
      break;
    case 6:
      li.innerText = `Company: ${bcGlobal}`;
      console.log(`Company: ${bcGlobal}`);
      break;
    case 9:
      li.innerText = `Company: ${local}`;
      console.log(`Company: ${local}`);
      break;
    default:
      console.log(`Company: Cannot find`);
  }
};

//Validation using luhn algorithm
const validateCheck = (num) => {
  const li = document.createElement("li");
  checkUl.appendChild(li);
  const isValid = num % 10 == 0 ? true : false;
  if (isValid == true) {
    li.classList.add("valid");
    li.innerText = `This card is valid`;
  } else {
    li.classList.add("invalid");
    li.innerText = `This card is invalid`;
  }
};

//result section
const validateCred = (cardArr) => {
  let i = 0,
    sum = 0;
  let reverseArr = cardArr.reverse(); //for luhn algorithm check
  while (i < reverseArr.length) {
    if (i % 2 == 1) {
      let doubleNum = reverseArr[i] * 2;
      if (doubleNum > 9) {
        doubleNum -= 9;
        sum += doubleNum;
      } else {
        sum += doubleNum;
      }
    } else {
      sum += reverseArr[i];
    }
    i++;
  }
  validateCheck(sum);
  cardArr = reverseArr.reverse();
  companyCheck(cardArr);
};

//html section
const submitEventHandler = (event) => {
  event.preventDefault();
  const userInput = checkInput.value;
  const userCardNum = userInput.split("").map(function (item) {
    return parseInt(item);
  });
  if (userCardNum.length !== 0) {
    validateCred(userCardNum);
    checkInput.value = "";
    checkInput.placeholder = "Card Number";
  } else {
    checkInput.placeholder = "Please enter a number before enter";
  }
};

const htmlHandler = () => {
  checkForm.addEventListener("submit", submitEventHandler);
};

//print section
const initVaildCard = () => {
  htmlHandler();
};

initVaildCard();
