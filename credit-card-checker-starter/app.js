const checkForm = document.querySelector("form"),
  checkInput = checkForm.querySelector("input"),
  checkBtn = checkForm.querySelector("button");

//Check company by using arr[0]
const companyCheck = (arr) => {
  const amex = "Amex (American Express)",
    visa = "Visa",
    mastercard = "Mastercard",
    bcGlobal = "BC globalr",
    local = "Local card";

  const firstNum = arr[0];

  switch (firstNum) {
    case 3:
      console.log(`Company: ${amex}`);
      break;
    case 4:
      console.log(`Company: ${visa}`);
      break;
    case 5:
      console.log(`Company: ${mastercard}`);
      break;
    case 6:
      console.log(`Company: ${bcGlobal}`);
      break;
    case 9:
      console.log(`Company: ${local}`);
      break;
    default:
      console.log(`Company: Cannot find`);
  }
};

//Validation using luhn algorithm
const validateCheck = (num) => {
  const isValid = num % 10 == 0 ? true : false;
  isValid
    ? console.log(`This card is valid`)
    : console.log(`This card in invalid`);
  return isValid;
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
  let cardNumber = checkInput.value;
  console.log(typeof cardNumber, cardNumber);
};

const htmlHandler = () => {
  checkForm.addEventListener("submit", submitEventHandler);
};

//print section
const initVaildCard = () => {
  htmlHandler();
};

initVaildCard();
