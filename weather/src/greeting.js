"use strict";

export default class Greeting {
  constructor() {
    this.greetingForm = document.querySelector(".greeting__form");
    this.greetingInput = document.querySelector(".greeting__input");
    this.greetingDesc = document.querySelector(".greeting__desc");

    this.USER_LS = "userName";
    this.CLASS_SHOW = "showGreeting";
  }

  _submitEventHandler = (event) => {
    event.preventDefault();
    const userName = this.greetingInput.value;
    this._greeting(userName);
    this._saveName(userName);
  };

  _greeting = (name) => {
    this.greetingForm.classList.remove(this.CLASS_SHOW);
    this.greetingDesc.classList.add(this.CLASS_SHOW);
    this.greetingDesc.textContent = `Hello ${name}`;
  };

  _askName() {
    this.greetingForm.classList.add(this.CLASS_SHOW);
    this.greetingForm.addEventListener("submit", this._submitEventHandler);
  }

  _saveName(name) {
    localStorage.setItem(this.USER_LS, name);
  }

  loadName() {
    const currentUser = localStorage.getItem(this.USER_LS);
    if (currentUser === null) {
      this._askName();
    } else {
      this._greeting(currentUser);
    }
  }
}
