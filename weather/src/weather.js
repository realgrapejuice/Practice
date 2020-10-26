"use strict";

export default class Weather {
  constructor() {
    this.weather = document.querySelector(".weather__container");

    this.API_KEYS = `a78699632e04027812ce11fd7ac08f7a`;
    this.COORDS = `userCoords`;
  }

  getWeather(lat, lon) {
    const p = document.createElement("p");
    this.weather.append(p);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEYS}&units=metric`
    )
      .then((resolve) => resolve.json()) //
      .then((json) => {
        const climate = json.weather[0].main;
        const temperature = json.main.temp;
        const currentLocation = json.name;
        p.textContent = `${climate}, ${temperature}, ${currentLocation}`;
      });
  }

  savePosition = (obj) => {
    localStorage.setItem(this.COORDS, JSON.stringify(obj));
  };

  handleSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObj = {
      latitude,
      longitude,
    };
    this.savePosition(positionObj);
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

  toggleWeatherIcon(climate) {}

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
