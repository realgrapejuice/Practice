"use strict";

export default class Background {
  constructor() {
    this.body = document.querySelector("body");
  }

  _randomNumber() {
    const randomNum = Math.floor(Math.random() * 11) + 1;
    return randomNum;
  }

  getBackgroundImg() {
    const randomNum = this._randomNumber();
    this.body.style.backgroundImage = `url(./src/img/img${randomNum}.jpg)`;
  }
}
