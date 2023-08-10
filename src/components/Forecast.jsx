import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from '@mui/material';
import { format } from 'date-fns';
import axios from "axios";
import "./Forecast.css";

export default function Forecast({ lat, lon }) {
  const [weatherData, setWeatherData] = useState([]);
  //   const [temp, setTemp] = useState([]);
  //   const [description, setDescription] = useState([]);

  // console.log(lat + lon);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/forecast/${lat}/${lon}`)
      .then((res) => {
        // console.log(data);
        setWeatherData(res.data.list);

        console.log(res.data.list);
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
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignContent: 'space-between' }}>
      {Object.keys(groupedByDate)
        .slice(0, 3) // Take only the first three days' data
        .map((date) => {
          const formattedDate = format(new Date(date), 'EEEE'); 
  
          return (
            <Card spacing={20} className="weather-card" key={date} variant="outlined" sx={{ width: '500px', height: '500px' }} > {/* Adjust the width and height */}
              <CardContent sx={{ maxHeight: '500px', overflow: 'auto'}}>
                <Typography variant="h6" component="h2">
                  {formattedDate} 
                </Typography>
                {groupedByDate[date].map((item, index) => (
                  <div key={index}>
                    <Typography sx={{fontWeight: 'bold'}} variant="body1">
                      {new Date(item.dt_txt).getHours()}:00
                    </Typography>
                    <Typography variant="body1">
                      {Math.trunc(item.main.temp - 273.15)}&deg;C
                    </Typography>
                    <Typography variant="body1">
                      {item.weather[0].description}
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
    </Box>
  );
  
  
  
  
  
  
}
