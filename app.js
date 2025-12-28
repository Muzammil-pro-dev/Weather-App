
var apiKey = "cdb22b689f4e415d99d2c2a03d95009b";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


var searchBox = document.querySelector(".search input");
var searchBtn = document.querySelector(".search button");
var weatherIcon = document.querySelector(".weather-icon");
var errorElement = document.querySelector(".error p");
var weatherElement = document.querySelector(".weather");
var loadingElement = document.querySelector(".loading");
var searchContainer = document.querySelector(".search");
var title = document.getElementById("title");


title.addEventListener("click", function() {
  searchContainer.style.display = "flex";
});


function checkWeather(city) {
  if (city === "") {
    errorElement.textContent = "Please enter a city name.";
    errorElement.parentElement.style.display = "block";
    weatherElement.style.display = "none";
    loadingElement.style.display = "none";
    return;
  }

  loadingElement.style.display = "block";
  errorElement.parentElement.style.display = "none";
  weatherElement.style.display = "none";

  fetch(apiUrl + encodeURIComponent(city) + "&appid=" + apiKey)
    .then(function(response) {
      if (response.status === 404) {
        errorElement.textContent = "City not found.";
        errorElement.parentElement.style.display = "block";
        weatherElement.style.display = "none";
      } else {
        return response.json();
      }
    })
    .then(function(data) {
      if (!data) return;

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main === "Clouds") weatherIcon.src = "images/clouds.png";
      else if (data.weather[0].main === "Clear") weatherIcon.src = "images/clear.png";
      else if (data.weather[0].main === "Rain") weatherIcon.src = "images/rain.png";
      else if (data.weather[0].main === "Drizzle") weatherIcon.src = "images/drizzle.png";
      else if (data.weather[0].main === "Mist") weatherIcon.src = "images/mist.png";
      else weatherIcon.src = "";

      weatherElement.style.display = "block";
      loadingElement.style.display = "none";
    })
    .catch(function() {
      errorElement.textContent = "Failed to fetch data. Try again!";
      errorElement.parentElement.style.display = "block";
      weatherElement.style.display = "none";
      loadingElement.style.display = "none";
    });
}


searchBtn.addEventListener("click", function() {
  checkWeather(searchBox.value);
});


searchBox.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
