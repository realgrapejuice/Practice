"use strict";

import Background from "./background.js";
import Clock from "./clock.js";
import Greeting from "./greeting.js";
import Focus from "./focus.js";

const background = new Background();
const currentTime = new Clock();
const greeting = new Greeting();
const focus = new Focus();

function init() {
  background.getBackgroundImg();
  greeting.loadName();
  focus.loadFocus();
  setInterval(() => {
    currentTime.updateTime();
  }, 1000);
}

init();
