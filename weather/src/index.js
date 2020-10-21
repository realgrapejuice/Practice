"use strict";

import Clock from "./clock.js";
import Greeting from "./greeting.js";

const currentTime = new Clock();
const greeting = new Greeting();

function init() {
  greeting.loadName();
  setInterval(() => {
    currentTime.updateTime();
  }, 1000);
}

init();
