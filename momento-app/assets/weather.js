const weather = document.querySelector(".js-weather");

const API_KEY = "a78699632e04027812ce11fd7ac08f7a";
const COORDS = "userCoords";

const getWeather = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json(); // Using then to wait until all datas are loaded
    })
    .then(function (json) {
      const climate = json.weather[0].main;
      const temperature = json.main.temp;
      const currentLocation = json.name;
      console.log(climate, temperature, currentLocation);
      weather.innerText = `${climate} | ${temperature}°C | ${currentLocation}`;
    });
};

const savePosition = (obj) => {
  localStorage.setItem(COORDS, JSON.stringify(obj));
};

const handleGeoSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const positionObj = {
    latitude,
    longitude,
  };
  savePosition(positionObj);
  getWeather(latitude, longitude);
};

const handleGeoError = () => {
  console.log(`Can't access to current location`);
};

const getCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

const loadCoords = () => {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    getCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
};

const initWeather = () => {
  loadCoords();
};

initWeather();
