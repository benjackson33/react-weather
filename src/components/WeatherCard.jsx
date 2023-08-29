import sun from "./sun.png";
import cloud from "./cloud.png";
import rain from "./rain.png";
import wind from "./wind.png";
import brokenCloud from "./broken-cloud.png";
import thunder from "./thunder.png";
import snow from "./snow.png";
import { Typography, Paper } from "@mui/material";
import { styled } from '@mui/system';
import "./WeatherCard.css";

export default function FirstWeatherCard({ item, index, weatherId }) {

  const CustomPaper = styled(Paper)(({ theme }) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    padding: '16px',
    margin: '10px'
  }));


  const weatherConditions = {
    thunder: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    rain: [
      300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511,
      520, 521, 522, 531,
    ],
    snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
    sun: [800],
    cloud: [804],
    brokenCloud: [801, 802, 803],
  };

  const weatherImage = (weatherId) => {
    for (const condition in weatherConditions) {
      if (weatherConditions[condition].includes(weatherId)) {
        switch (condition) {
          case "thunder":
            return <img className="icon" src={thunder} alt="Thunder" />;
          case "rain":
            return <img className="icon" src={rain} alt="Rain" />;
          case "snow":
            return <img className="icon" src={snow} alt="Snow" />;
          case "sun":
            return <img className="icon" src={sun} alt="Sun" />;
          case "cloud":
            return <img className="icon" src={cloud} alt="Cloud" />;
          case "brokenCloud":
            return (
              <img
                className="icon"
                src={brokenCloud}
                alt="Broken Cloud"
              />
            );
          default:
            return null;
        }
      }
    }
    return null;
  };

  const weatherImageComponent = weatherImage(weatherId);

  return (
    <>
      <CustomPaper elevation={3} key={index} key={index}>
        <Typography varia sx={{ fontWeight: "bold" }} variant="body1">
        {new Date(item.dt_txt).toLocaleString("en-GB", {
          hour: "numeric",
          hour12: true,
          hourCycle: "h12", 
        }).replace(/^0/, "12")}{" "}
        </Typography>
        <Typography variant="body1">
          {weatherImageComponent}

        </Typography>
        <Typography variant="body1">
          {Math.trunc(item.main.temp - 273.15)}&deg;C
        </Typography>
      </CustomPaper>
    </>
  );
}
