import React, { useState } from "react";
import "./Card.css";
import logo from "./weatherlogo.png";

export default function Card() {
  const [weather, setWeather] = useState({
    temperature: "-",
    feels_like: "-",
    weather_type: "-",
    wind_speed: "-",
    humidity: "-",
    pressure: "-",
    visibility: "-",
    sunrise: "-",
    sunset: "-",
  });

  const [icon, setIcon] = useState(logo);
  const [city, setCity] = useState("");

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  };

  const citySearch = (event) => {
    setCity(event.target.value.trim());
  };

  const searchTemp = async (event) => {
    event.preventDefault();

    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_PUBLIC_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        alert("City not found. Try again!");
      } else {
        setWeather({
          temperature: data.main.temp,
          feels_like: data.main.feels_like,
          weather_type: data.weather[0].description,
          wind_speed: data.wind.speed,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          visibility: data.visibility / 1000 + " km",
          sunrise: formatTime(data.sys.sunrise),
          sunset: formatTime(data.sys.sunset),
        });

        setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="weather-card">
      <form className="search-bar" onSubmit={searchTemp}>
        <input
          type="text"
          placeholder="Enter city name..."
          onChange={citySearch}
          value={city}
        />
        <button type="submit">🔍</button>
      </form>

      <img src={icon} alt="weather-icon" className="weather-icon" />
      <h2>{city ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() : "City"}</h2>
      <h3 className="temperature">{weather.temperature}°C</h3>
      <h4 className="feels-like">Feels like: {weather.feels_like}°C</h4>
      <h3 className="weather-type">{weather.weather_type}</h3>

      <div className="weather-details">
        <p>💨 Wind Speed: {weather.wind_speed} km/h</p>
        <p>💧 Humidity: {weather.humidity}%</p>
        <p>📌 Pressure: {weather.pressure} hPa</p>
        <p>👀 Visibility: {weather.visibility}</p>
        <p>🌅 Sunrise: {weather.sunrise}</p>
        <p>🌇 Sunset: {weather.sunset}</p>
      </div>
    </div>
  );
}
