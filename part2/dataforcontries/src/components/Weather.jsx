const Weather = ({weather, country}) => {

    return (
      <>
        <h2>Weather in {country}</h2>
        <br />
  
        <p>temprature {weather.temp} kelvin</p>
        <img src={weather.icon ? `https://openweathermap.org/img/wn/0${weather.icon}d.png` : null} style={{width: "100px", height: "100px"}} />
        <p>wind {weather.wind} m/s</p>
  
      </>
     );
  }

export default Weather