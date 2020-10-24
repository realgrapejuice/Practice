"use strict";

export default class Focus {
  constructor() {
    this.formBox = document.querySelector(".focus__form--box");
    this.formForm = document.querySelector(".focus__form");
    this.formInput = document.querySelector(".focus__input");
    this.focusAnswer = document.querySelector(".focus__answer");

    this.FOCUS_LS = "focusItem";
    this.CLASS_FOCUS = "showFocus";
    this.checked = false;
  }

  _submitEventHandler = (event) => {
    event.preventDefault();
    const focusItem = this.formInput.value;
    console.log(focusItem);
    this._showFocus(focusItem);
    this._saveFocus(focusItem);
  };

  _askFocus() {
    this.formBox.classList.add(this.CLASS_FOCUS);
    this.formForm.addEventListener("submit", this._submitEventHandler);
    this.formInput.value = ``;
  }

  _showFocus(item) {
    this.formBox.classList.remove(this.CLASS_FOCUS);
    this.focusAnswer.classList.add(this.CLASS_FOCUS);
    this._makeFocusElement(item);
  }

  _saveFocus(item) {
    localStorage.setItem(this.FOCUS_LS, item);
  }

  _deleteFocus() {
    localStorage.removeItem(this.FOCUS_LS);
  }

  _resetFocus() {
    this.focusAnswer.classList.remove(this.CLASS_FOCUS);
    this.focusAnswer.innerHTML = ``;
  }

  _makeFocusElement(node) {
    const input = document.createElement("input");
    const p = document.createElement("p");
    const button = document.createElement("button");
    input.setAttribute("class", "answer__input");
    input.setAttribute("type", "checkbox");
    p.textContent = node;
    button.setAttribute("type", "button");
    button.textContent = `Del`;
    this.focusAnswer.append(input, p, button);
    input.addEventListener("click", () => {
      if (!this.checked) {
        this.checked = true;
        p.style.textDecoration = `line-through`;
        p.style.color = `#aaa69d`;
      } else {
        this.checked = false;
        p.style.textDecoration = `none`;
        p.style.color = `#f7f1e3`;
      }
    });
    button.addEventListener("click", () => {
      this._deleteFocus();
      this._resetFocus();
      this._askFocus();
    });
  }

  loadFocus() {
    const focusItem = localStorage.getItem(this.FOCUS_LS);
    if (focusItem === null) {
      this._askFocus();
    } else {
      this._showFocus(focusItem);
    }
  }
}
