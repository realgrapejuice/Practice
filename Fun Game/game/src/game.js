"use strict";
import Field from "./field.js";
import Sound from "./sound.js";

export const Reason = Object.freeze({
  win: `win`,
  lose: `lose`,
  cancel: `cancel`
})

//Builder Pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    console.log(this.gameDuration)
    return this;
  }

  carrotCount(carrotNum) {
    this.carrotCount = carrotNum;
    return this;
  }

  bugCount(bugNum) {
    this.bugCount = bugNum;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount, //
      this.bugCount //
    )
  }
}

class Game {
  constructor(carrotCount, bugCount, gameDuration) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameDuration = gameDuration;

    this.started = false;
    this.score = 0;
    this.timer = null;

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onFieldClickListener);
    this.gameSound = new Sound();

    this.gameTimerIndicator = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.gameButton = document.querySelector(".game__button");
    this.gameButton.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
      this.started = !this.started;
    });
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  stop() {
    this.stopTimer();
    this.gameSound.stopBgSound();
    this.gameSound.playFailSound();
    this.hideTimerAndScore();
    this.hideStartBtn();
    this.onGameStop && this.onGameStop(Reason.cancel);
  }

  start() {
    this.gameSound.playBgSound();
    this.gameField.visualize();
    this.showTimerAndScore();
    this.startTimer();
    this.showStopBtn();
  }

  reset() {
    this.score = 0;
    this.gameField.clearField();
    this.hideTimerAndScore();
    this.showStartBtn();
  }

  onFieldClickListener = (item) => {
    if (!this.started) return;
    if (item === `carrot`) {
      this.gameSound.playCarrotSound();
      this.score++;
      this.updateScore(this.score);

      if (this.score === this.carrotCount) {
        this.finishGame(true);
        this.gameSound.playWinSound();
        this.gameSound.stopBgSound();
      }
    } else if (item === `bug`) {
      this.gameSound.playFailSound();
      this.gameSound.stopBgSound();
      this.finishGame(false);
    }
  }

  finishGame(win) {
    this.started = false;
    this.stopTimer();
    this.hideStartBtn();
    this.onGameStop && this.onGameStop(win ? Reason.win : Reason.lose);
  }

  //Game Timer section
  startTimer() {
    let remainTime = this.gameDuration;
    this.updateTimerText(remainTime);

    this.timer = setInterval(() => {
      if (remainTime <= 0) {
        clearInterval(this.timer);
        if (this.started) {
          this.finishGame(this.score === this.carrotCount);
        }
        return;
      }
      this.updateTimerText(--remainTime);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    this.gameTimerIndicator.textContent = `${minutes}:${seconds}`;
  }

  //Show start & stop button section
  showStartBtn() {
    const icon = document.querySelector(".fas");
    icon.classList.remove("fa-stop");
    this.gameButton.style.visibility = "visible";
  }

  showStopBtn() {
    const icon = document.querySelector(".fas");
    icon.classList.add("fa-stop");
    this.gameButton.style.visibility = "visible";
  }

  //Hide start & stop button section
  hideStartBtn() {
    this.gameButton.style.visibility = `hidden`;
  }

  //Show & Hide Timer, Score DOM elements section
  showTimerAndScore() {
    this.gameTimerIndicator.style.visibility = `visible`;
    this.gameScore.style.visibility = `visible`;
    this.gameScore.textContent = this.carrotCount;
  }

  hideTimerAndScore() {
    this.gameTimerIndicator.style.visibility = `hidden`;
    this.gameScore.style.visibility = `hidden`;
  }

  updateScore(newScore) {
    this.gameScore.textContent = this.carrotCount - newScore;
  }
}
