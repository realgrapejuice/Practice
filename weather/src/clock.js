"use strict";

export default class Clock {
  constructor() {
    this.clockContainer = document.querySelector(".clock__container");
    this.clock = document.querySelector(".clock__clock");
  }

  updateTime() {
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    this._getCurrentTime(hour, minute, second);
  }

  _getCurrentTime(h, m, s) {
    let currentTime = null;
    if (h > 12) {
      currentTime = `PM ${h - 12 < 10 ? `0${h - 12}` : h - 12}:${
        m < 10 ? `0${m}` : m
      }:${s < 10 ? `0${s}` : s}`;
    } else {
      currentTime = `AM ${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${
        s < 10 ? `0${s}` : s
      }`;
    }
    this.clock.textContent = currentTime;
  }
}
