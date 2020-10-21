"use strict";

import Clock from "./clock.js";
import Greeting from "./greeting.js";
import Focus from "./focus.js";

const currentTime = new Clock();
const greeting = new Greeting();
const focus = new Focus();

function init() {
  focus.loadFocus();
  greeting.loadName();
  setInterval(() => {
    currentTime.updateTime();
  }, 1000);
}

init();
