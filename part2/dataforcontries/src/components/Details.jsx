import Weather from "./Weather";

const Details = ({details, weather}) => {
    if (!details.length) return null
    let detail = details[0]
    return ( 
      <>
        <h2>{detail.name.common}</h2>
        <br />
  
        <p>capital {detail.capital}</p>
        <p>area {detail.area}</p>
        <br/>
  
        <p style={{fontWeight: 700}}>languages:</p>
        <ul style={{marginLeft: "10px"}}>
          {
            Object.values(detail.languages).map(language => <li key={language}>{language}</li>)
          }
        </ul>
        <br />
  
        <img src={detail.flags.png} />
        <br />
  
        {/* <p>{detail.latlng[0]}, {detail.latlng[1]}, {detail.name.common}</p> */}
  
        <Weather weather={weather} country={detail.name.common} />
      </>
     );
  }

  export default Details