var submit = document.querySelector(".submit")
var inputValue = document.querySelector(".input-value")
var cityName = document.querySelector(".city-name")
var desc = document.querySelector(".desc")
var shortDesc = document.querySelector(".short-desc")
var temp = document.querySelector(".temp")
var locate = document.querySelector(".locate-btn")
var feelsLike = document.querySelector(".feels-like")
var pressure = document.querySelector(".pressure")
var humidity = document.querySelector(".humidity")
var visibility = document.querySelector(".visibility")
var wind = document.querySelector(".wind")

var apiKey = {Enter API Key here}

function setData(data) {
	var nameValue = data["name"]
	var tempValue = data["main"]["temp"]
	var feelsLikeValue = data["main"]["feels_like"]

	var pressureValue = data["main"]["pressure"]
	var humidityValue = data["main"]["humidity"]
	var visibilityValue = data["visibility"]
	var windValue = data["wind"]["speed"]
	var windDegValue = data["wind"]["deg"]

	var shortDescValue = data["weather"][0]["main"]
	var descValue = data["weather"][0]["description"]
	var countryValue = data["sys"]["country"]

	cityName.innerHTML = nameValue + ", " + countryValue.toUpperCase()
	temp.innerHTML = Math.round(tempValue - 273.15) + "°C"
	feelsLike.innerHTML =
		"Feels like " + Math.round(feelsLikeValue - 273.15) + "°C"
	pressure.innerHTML = "Pressure " + pressureValue + " mb"
	humidity.innerHTML = "Humidity " + humidityValue + "%"
	shortDesc.innerHTML = shortDescValue
	desc.innerHTML = descValue
	visibility.innerHTML = "Visibility " + visibilityValue + "m"
	wind.innerHTML = "Wind " + windValue + "m/s " + windDegValue + "°"
}

getCurrentWeather()
function getCurrentWeather() {
	try {
		navigator.geolocation.getCurrentPosition(function (position) {
			let lat = position.coords.latitude
			let lon = position.coords.longitude
			fetch(
				"https://api.openweathermap.org/data/2.5/weather?lat=" +
					lat +
					"&lon=" +
					lon +
					"&appid=" +
					apiKey
			)
				.then((response) => response.json())
				.then((data) => {
					setData(data)
				})
				.catch((error) => alert("Location access restricted"))
		})
	} catch (error) {
		console.log(error)
	}
}

submit.addEventListener("click", function () {
	fetch(
		"https://api.openweathermap.org/data/2.5/weather?q=" +
			inputValue.value +
			"&appid=" +
			apiKey
	)
		.then((response) => response.json())
		.then((data) => {
			setData(data)
		})
		.catch((error) => alert("Wrong city name"))
})

locate.addEventListener("click", function (event) {
	getCurrentWeather()
})
