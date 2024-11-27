const apiKey = "a3c199f4e0074fa2db23787fdd975d4a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

const weatherIcon = document.getElementById("weather-icon");
const tempElement = document.getElementById("temp");
const cityElement = document.getElementById("city");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // Update weather information
        updateWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to update the weather information on the page
function updateWeather(data) {
    const { name, main, weather, wind } = data;

    cityElement.textContent = name;
    tempElement.textContent = `${Math.round(main.temp)}°C`;
    humidityElement.textContent = `${main.humidity}%`;
    windSpeedElement.textContent = `${Math.round(wind.speed)} km/h`;

    // Update weather icon
    const weatherCondition = weather[0].main.toLowerCase();
    let iconPath = "images/";
    if (weatherCondition.includes("cloud")) {
        iconPath += "clouds.png";
    } else if (weatherCondition.includes("rain")) {
        iconPath += "rain.png";
    } else if (weatherCondition.includes("clear")) {
        iconPath += "clear.png";
    } else if (weatherCondition.includes("snow")) {
        iconPath += "snow.png";
    } else if (weatherCondition.includes("mist") || weatherCondition.includes("haze")) {
        iconPath += "mist.png";
    } else {
        iconPath += "drizzle.png";
    }

    weatherIcon.src = iconPath;
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});
// Event listener for the Enter key press
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }
});
