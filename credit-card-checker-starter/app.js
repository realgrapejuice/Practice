const section = document.querySelector(".validate_container"),
  checkForm = document.querySelector("form"),
  checkInput = checkForm.querySelector("input"),
  checkBtn = checkForm.querySelector("button");

//Check company by using arr[0]
const companyCheck = (arr) => {
  const amex = "Amex (American Express)",
    visa = "Visa",
    mastercard = "Mastercard",
    bcGlobal = "BC globalr",
    local = "Local card";
  const p = document.createElement("p");
  section.appendChild(p);
  const firstNum = arr[0];

  switch (firstNum) {
    case 3:
      p.innerText = `Company: ${amex}`;
      console.log(`Company: ${amex}`);
      break;
    case 4:
      p.innerText = `Company: ${visa}`;
      console.log(`Company: ${visa}`);
      break;
    case 5:
      p.innerText = `Company: ${mastercard}`;
      console.log(`Company: ${mastercard}`);
      break;
    case 6:
      p.innerText = `Company: ${bcGlobal}`;
      console.log(`Company: ${bcGlobal}`);
      break;
    case 9:
      p.innerText = `Company: ${local}`;
      console.log(`Company: ${local}`);
      break;
    default:
      console.log(`Company: Cannot find`);
  }
};

//Validation using luhn algorithm
const validateCheck = (num) => {
  const p = document.createElement("p");
  section.appendChild(p);
  const isValid = num % 10 == 0 ? true : false;
  if (isValid == true) {
    p.classList.add("valid");
    p.innerText = `This card is valid`;
  } else {
    p.classList.add("invalid");
    p.innerText = `This card is invalid`;
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
  validateCred(userCardNum);
  checkInput.value = "";
};

const htmlHandler = () => {
  checkForm.addEventListener("submit", submitEventHandler);
};

//print section
const initVaildCard = () => {
  htmlHandler();
};

initVaildCard();
