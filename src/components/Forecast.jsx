import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from '@mui/material';
import { format } from 'date-fns';
import axios from "axios";
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import "./Forecast.css";

import WeatherCard from "./WeatherCard";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Create a styled component with the animation
const AnimatedCard = styled(Card)`
  width: 250px;
  height: 400px;
  animation: ${fadeIn} 0.75s ease-in-out;
`;


export default function Forecast({ lat, lon, weatherId }) {
  const [weatherData, setWeatherData] = useState([]);
  //   const [temp, setTemp] = useState([]);
  //   const [description, setDescription] = useState([]);

  // console.log(lat + lon);

  useEffect(() => {
    axios
      .get(`https://express-server-i88j.onrender.com/forecast/${lat}/${lon}`)
      .then((res) => {
        // console.log(data);
        setWeatherData(res.data.list);

        // console.log(res.data.list);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  }, [lat, lon]);

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
        .slice(0, 3)
        .map((date) => {
          const formattedDate = format(new Date(date), 'EEEE'); 
  
          return (
            <AnimatedCard key={date} variant="outlined">
              <CardContent sx={{ maxHeight: '350px', overflow: 'auto'}}>
                <Typography variant="h6" component="h2">
                  {formattedDate} 
                </Typography>
                {groupedByDate[date].map((item, index) => (
                  <WeatherCard 
                    item={item} 
                    index={index}
                    weatherId={weatherId}
                  />
                ))}
              </CardContent>
            </AnimatedCard>
          );
        })}
    </Box>
  );
  
  
  
  
  
}
