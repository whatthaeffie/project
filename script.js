let now = new Date();
let showDay = document.querySelector("#date");
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${minutes}`;
}
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
showDay.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#answer");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function searchCity(city) {
  let key = "02b99a7efa44729756b3eefe7f2f7c7b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}
let searchForm = document.querySelector("#searching");
searchForm.addEventListener("submit", search);
