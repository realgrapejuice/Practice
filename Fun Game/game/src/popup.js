"use strict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpMessage = this.popUp.querySelector(".pop-up__message");
    this.resetBtn = document.querySelector(".pop-up__refresh");
    this.resetBtn.addEventListener("click", () => {
      this.onClick && this.onClick(); // this.onClick에 변수가 할당되어 있으면, 그 변수를 함수로서 호출해달라
      this.hide();
    });
  }

  setClickListener(callback) {
    this.onClick = callback;
  }

  showWithText(text) {
    this.popUp.classList.remove("hide");
    this.popUpMessage.textContent = text;
  }

  hide() {
    this.popUp.classList.add("hide");
  }
}
