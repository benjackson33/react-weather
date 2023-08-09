import { useEffect, useState } from "react";
import "./Forecast.css"

export default function Forecast({lat, lon, API}) {
  const [weatherData, setWeatherData] = useState([]);
  //   const [temp, setTemp] = useState([]);
  //   const [description, setDescription] = useState([]);

  // console.log(lat + lon);
  console.log(API);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data.list);

        console.log(data.list);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  }, []);

  const groupedByDate = weatherData.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0]; // Extract date from dt_txt
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div>
      
      {Object.keys(groupedByDate).map((date) => (
        <div className="weather-card" key={date}>
          <h2>{date}</h2>
          {groupedByDate[date].map((item, index) => (
            <div  key={index}>
              <p>{item.dt_txt.split(" ")[1]}</p>
              <p>{Math.trunc(item.main.temp - 273.15)}&deg;C</p>   
              <p>{item.weather[0].description}</p>
              {/* Add more data points you want to display */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
