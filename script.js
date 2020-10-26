function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function displayTemperature(response) {
  fahrTemp = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}
function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];

  forecastElement.innerHTML = `<div class="col-2">
            <h3>${formatHours(forecast.dt * 1000)}</h3>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" />
            <div class="weather-forecast-temp"><strong>${Math.round(
              forecast.main.temp_max
            )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
          </div>`;

  forecast = response.data.list[1];
  forecastElement.innerHTML += `<div class="col-2">
            <h3>${formatHours(forecast.dt * 1000)}</h3>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" />
            <div class="weather-forecast-temp"><strong>${Math.round(
              forecast.main.temp_max
            )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
          </div>`;
  forecast = response.data.list[2];
  forecastElement.innerHTML += `<div class="col-2">
            <h3>${formatHours(forecast.dt * 1000)}</h3>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" />
            <div class="weather-forecast-temp"><strong>${Math.round(
              forecast.main.temp_max
            )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
          </div>`;
  forecast = response.data.list[3];
  forecastElement.innerHTML += `<div class="col-2">
            <h3>${formatHours(forecast.dt * 1000)}</h3>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" />
            <div class="weather-forecast-temp"><strong>${Math.round(
              forecast.main.temp_max
            )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
          </div>`;
  forecast = response.data.list[4];
  forecastElement.innerHTML += `<div class="col-2">
            <h3>${formatHours(forecast.dt * 1000)}</h3>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" />
            <div class="weather-forecast-temp"><strong>${Math.round(
              forecast.main.temp_max
            )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
          </div>`;
  forecast = response.data.list[5];
  forecastElement.innerHTML += `<div class="col-2">
            <h3>${formatHours(forecast.dt * 1000)}</h3>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" />
            <div class="weather-forecast-temp"><strong>${Math.round(
              forecast.main.temp_max
            )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
          </div>`;
}

function searchCity(city) {
  let key = "02e7ddbc3ff311d4cabd5ecac405c58a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
  axios.get(url).then(displayTemperature);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=imperial`;
  axios.get(url).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  searchCity(cityElement.value);
}

function displayCelTemp(event) {
  event.preventDefault();
  let celTemperature = ((fahrTemp - 32) * 5) / 9;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celTemperature);
}
function displayFahrTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrTemp);
}
let fahrTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelTemp);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrTemp);
