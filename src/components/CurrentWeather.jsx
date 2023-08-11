import { Box, Typography } from '@mui/material';
import sun from './sun.png';
import cloud from './cloud.png';
import rain from './rain.png';
import wind from './wind.png';
import brokenCloud from './broken-cloud.png';
import thunder from './thunder.png';
import snow from './snow.png';
import './CurrentWeather.css'

export default function Weather({ description, temp, weatherId }) {
  const weatherConditions = {
    thunder: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    rain: [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
    snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
    sun: [800],
    cloud: [804],
    brokenCloud: [801, 802, 803],
  };

  const weatherImage = (weatherId) => {
    for (const condition in weatherConditions) {
      if (weatherConditions[condition].includes(weatherId)) {
        switch (condition) {
          case 'thunder':
            return <img className='weather-icon' src={thunder} alt="Thunder" />;
          case 'rain':
            return <img className='weather-icon' src={rain} alt="Rain" />;
          case 'snow':
            return <img className='weather-icon' src={snow} alt="Snow" />;
          case 'sun':
            return <img className='weather-icon' src={sun} alt="Sun" />;
          case 'cloud':
            return <img className='weather-icon' src={cloud} alt="Cloud" />;
          case 'brokenCloud':
            return <img className='weather-icon' src={brokenCloud} alt="Broken Cloud" />;
          default:
            return null;
        }
      }
    }
    return null;
  };

  const weatherImageComponent = weatherImage(weatherId);

  return (
    <Box>
      {weatherImageComponent}
      {/* <Typography className={weather}>{weather}</Typography> */}
      <p>{description}</p>
      {temp && <p>{Math.trunc(temp - 273.15)}&deg;C</p>}
    </Box>
  );
}
