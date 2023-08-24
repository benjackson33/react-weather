import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import { Button, Container, TextField } from "@mui/material";

export default function Search() {
  const [location, setLocation] = useState("Wellington");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState(null);
  const [showWeather, setShowWeather] = useState(true);
  const [showForecast, setShowForecast] = useState(false);
  const [weatherId, setWeatherId] = useState(0);

  useEffect(() => {
    handleSearch(); // Fetch weather for the initial location when component mounts
  }, []);

  const handleSearch = async () => {
    axios
      .get(`http://localhost:3001/${location}`)
      .then((res) => {
        const [data] = res.data;
        if (data) {
          const { lat, lon } = data;
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
    axios
      .get(`http://localhost:3001/location/weather/${lat}/${lon}`)
      .then((res) => {
        const data = res.data;
        if (data) {
          setWeather(data.weather[0].main);
          setDescription(data.weather[0].description);
          setTemp(data.main.temp);
          setWeatherId(data.weather[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const toggleWeather = () => {
    setShowWeather(true);
    setShowForecast(false);
  };

  const toggleForecast = () => {
    setShowWeather(false);
    setShowForecast(true);
  };

  return (
    <>
      <Container sx={{ m: 3 }}>
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button sx={{ m: 1 }} variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Container>
      {showWeather ? (
        <CurrentWeather 
        
          weather={weather}
          description={description}
          temp={temp}
          weatherId={weatherId}
        />
      ) : (
        <Container>
          <Forecast 
          lat={latitude} 
          lon={longitude} 
          weatherId={weatherId}  />
          
        </Container>
      )}

      <Container>
        {!showWeather ?
        <Button sx={{ m: 2.5 }} variant="contained" onClick={toggleWeather}>
          Current
        </Button>
        :
        <Button sx={{ m: 2.5 }} variant="contained" onClick={toggleForecast}>
          3 day
        </Button>
                }
      </Container>
    </>
  );
}
