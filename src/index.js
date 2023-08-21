let now = new Date();
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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novermber",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();

let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
let year = now.getFullYear();

let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = day + ", " + month + " " + date + ", " + year;

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = hour + ":" + minutes;

function submission(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");

  searchCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submission);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "17°☀️";
}

let celsiusLink = document.querySelector("#Celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "66°☀️";
}

let fahrenheitLink = document.querySelector("#Farenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function searchCity(city) {
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  let city = document.querySelector("h3");
  city.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempAssign = document.querySelector("#temperature");
  tempAssign.innerHTML = temperature;
}

function searchCurrentLocation(position) {
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCurrentTemp);
}

function showCurrentLocation(event) {
  console.log(event);
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector("#local_Btn");
currentLocationButton.addEventListener("click", showCurrentLocation);
