"use strict";

export default class Focus {
  constructor() {
    this.focusContainer = document.querySelector(".focus__container");
    this.focusForm = document.querySelector(".focus__form");
    this.focusInput = document.querySelector(".focus__input");
    this.focusItem = document.querySelector(".focus__item");
    this.focusQuestion = document.querySelector(".focus__question");
    this.clearBtn = document.querySelector(".focus__clear");

    this.ITEM_LS = "focusItem";
    this.CLASS_SHOW = "showFocus";
  }

  _submitEventHandler = (event) => {
    event.preventDefault();
    const focusItem = this.focusInput.value;
    this._showFocus(focusItem);
    this._saveFocus(focusItem);
  };

  _showFocus(name) {
    this.focusQuestion.classList.remove(this.CLASS_SHOW);
    this.focusForm.classList.remove(this.CLASS_SHOW);
    this.focusContainer.innerHTML = `
    <div class="focus__answer">
        <input type="checkbox" class="focus__checkbox" />
        <p class="focus__item ${this.CLASS_SHOW}">${name}</p>
        <button type="button" class="focus__clear">Clear</button>
    </div>
    `;
  }

  _askFocus() {
    this.focusQuestion.classList.add(this.CLASS_SHOW);
    this.focusForm.classList.add(this.CLASS_SHOW);
    this.focusForm.addEventListener("submit", this._submitEventHandler);
  }

  _saveFocus(item) {
    localStorage.setItem(this.ITEM_LS, item);
  }

  loadFocus() {
    const focusItem = localStorage.getItem(this.ITEM_LS);
    if (focusItem === null) {
      this._askFocus();
    } else {
      this._showFocus(focusItem);
    }
  }

  _checkboxHandler() {
    let status = false;
    if (!status) {
      status = true;
      this.focusItem.style.color = `#f7f1e3`;
    } else {
      status = false;
    }
  }
}
