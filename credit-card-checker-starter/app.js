const checkForm = document.querySelector("form"),
  checkInput = checkForm.querySelector("input"),
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
  li.classList.add("company");
  const firstNum = arr[0];
  switch (firstNum) {
    case 3:
      li.innerText = `Company: ${amex}`;
      break;
    case 4:
      li.innerText = `Company: ${visa}`;
      break;
    case 5:
      li.innerText = `Company: ${mastercard}`;
      break;
    case 6:
      li.innerText = `Company: ${bcGlobal}`;
      break;
    case 9:
      li.innerText = `Company: ${local}`;
      break;
    default:
      li.classList.add("unknown");
      li.innerText = `Company: Cannot find`;
  }
};

//Validation using luhn algorithm
const validateCheck = (num) => {
  let i = 0;
  const li = document.createElement("li");
  checkUl.appendChild(li);
  li.classList.add("validcheck");
  const isValid = num % 10 == 0 ? true : false;
  if (isValid == true) {
    li.classList.add("valid");
    li.innerText = `Validation: This card is valid`;
  } else {
    li.classList.add("invalid");
    li.innerText = `Validation: This card is invalid`;
  }
};

//result
const validateCred = (cardArr) => {
  while (checkUl.firstChild) {
    checkUl.removeChild(checkUl.firstChild);
  }
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
//html
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

//print
const initVaildCard = () => {
  checkForm.addEventListener("submit", submitEventHandler);
};

initVaildCard();
