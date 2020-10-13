"use strict";

export default class Sound {
  constructor() {
    this.carrotSound = new Audio("./sound/carrot_pull.mp3");
    this.failSound = new Audio("./sound/bug_pull.mp3");
    this.winSound = new Audio("./sound/game_win.mp3");
    this.bgSound = new Audio("./sound/bg.mp3");
  }

  playCarrotSound() {
    this.carrotSound.currentTime = 0;
    this.carrotSound.play();
  }

  playWinSound() {
    this.winSound.currentTime = 0;
    this.winSound.play();
  }

  playFailSound() {
    this.failSound.currentTime = 0;
    this.failSound.play();
  }

  playBgSound() {
    this.bgSound.currentTime = 0;
    this.bgSound.play();
  }

  stopBgSound() {
    this.bgSound.pause();
  }
}
