import React, { useEffect, useState } from "react"
import "./Search.css";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

// const API_KEY = "c3606b4cb3e49273488081b7e1a65c2a";
// const GEO_API_URL = "http://api.openweathermap.org/geo/1.0/direct";
// const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

export default function Search() {
  const [location, setLocation] = useState("London");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState(0);
  const [showWeather, setShowWeather] = useState(true);
  const [showForecast, setShowForecast] = useState(false);
  // const [showForecast, setShowForecast] = useState(false);

  // useEffect(() => {
  //   handleSearch();
  // }, []);

  

  const handleSearch = async () => {
  //  const url = "/location"
  //  const res = await fetch(url)
  //  const data  = await res.json()
  //  console.log(data);

    axios.get(`http://localhost:3001/${location}`)
      .then((res) => {
        // console.log(res);
        const [data] = res.data;
        if (data) {
          const { lat, lon } = data;
          // console.log(data);
          // console.log(lat);
          setLatitude(lat);
          setLongitude(lon);
          fetchWeatherData(lat, lon);
        }
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const fetchWeatherData = (lat, lon) => {
    axios.get(`http://localhost:3001/location/weather/${lat}/${lon}`)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data) {
          setWeather(data.weather[0].main);
          setDescription(data.weather[0].description);
          setTemp(data.main.temp);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };
  const toggleWeather = () => {
    setShowWeather(true);
    setShowForecast(false);
  };

  const toggleForecast = () => {
    setShowWeather(false);
    setShowForecast(true);
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

        {showWeather ? (
          <CurrentWeather
            weather={weather}
            description={description}
            temp={temp}
          />
        ) : (
          <section>
            <Forecast lat={latitude} lon={longitude} API={API_KEY} />
          </section>
        )}

        <div>
          <button onClick={toggleWeather}>Current</button>
          <button onClick={toggleForecast}>5 day</button>
        </div>
      </div>
    </section>
  );
}
