
export default function Weather({ weather, description, temp}) {


  

  return (
    <div >
      <div  className="weather-details">
        <div className={weather}></div>
        <div className={weather}></div>
      </div>
      <div className=""></div>
      <h2>{weather}</h2>
      <p>{description}</p>
      <p>{Math.trunc(temp - 273.15)}&deg;C</p> 
      
    </div>
  );
}
