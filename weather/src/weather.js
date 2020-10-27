"use strict";

export default class Weather {
  constructor() {
    this.weather = document.querySelector(".weather__container");

    this.API_KEYS = `a78699632e04027812ce11fd7ac08f7a`;
    this.COORDS = `userCoords`;
  }

  getWeather(lat, lon) {
    const p = document.createElement("p");
    const img = document.createElement("img");
    this.weather.append(img, p);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEYS}&units=metric`
    )
      .then((resolve) => resolve.json()) //
      .then((json) => {
        const climate = json.weather[0].main;
        const icon = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
        const temperature = Math.round(json.main.temp);
        const currentLocation = json.name;
        img.setAttribute("class", "weather__icon");
        img.setAttribute("src", icon);
        p.textContent = `${climate}, ${temperature}°C, ${currentLocation}`;
      });
  }

  saveCoords = (obj) => {
    localStorage.setItem(this.COORDS, JSON.stringify(obj));
  };

  handleSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObj = {
      latitude,
      longitude,
    };
    this.saveCoords(positionObj);
    this.getWeather(latitude, longitude);
  };

  handleError() {
    alert(`Access Error: Cannot access your location`);
  }

  getCoords() {
    navigator.geolocation.getCurrentPosition(
      this.handleSuccess,
      this.handleError
    );
  }

  loadCoords() {
    const currentCoords = localStorage.getItem(this.COORDS);
    if (!currentCoords) {
      this.getCoords();
    } else {
      const savedCoords = JSON.parse(currentCoords);
      this.getWeather(savedCoords.latitude, savedCoords.longitude);
    }
  }
}
