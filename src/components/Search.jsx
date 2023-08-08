import React, { useEffect, useState } from "react";
import "./Search.css";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

const API_KEY = "";
const GEO_API_URL = "http://api.openweathermap.org/geo/1.0/direct";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

export default function Search() {
  const [location, setLocation] = useState("London");

  const [weather, setWeather] = useState("");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    fetch(`${GEO_API_URL}?q=${location}&limit=5&appid=${API_KEY}`)
      .then((res) => res.json())
      .then(([data]) => {
        if (data) {
          const { lat, lon } = data;
          fetchWeatherData(lat, lon);
        }
      });
  };

  const fetchWeatherData = (lat, lon) => {
    fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
           setWeather(data.weather[0].main);
          setDescription(data.weather[0].description);
          setTemp(data.main.temp)
          // console.log(data.main)
        }
      });
  };

  return (
    <section>
      <div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <CurrentWeather 
        weather={weather} 
        description={description} 
        temp={temp} />
        <Forecast />

        <div>
      <button>Current</button>
      <button>5 day</button>
      </div>
      </div>
    </section>
  );
}
