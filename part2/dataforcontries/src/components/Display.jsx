import Details from './Details'

const Display = ({userinput, filtered, handleFilter, details, weather}) => {
    return ( 
      <>
        <ul>
          {
            (!userinput) ? null : (filtered.length > 10) ? "Too many matches, specify another filter" : filtered.map(country => {
              return <li key={country}>{country} <button onClick={() => handleFilter(country)}>show</button></li>
            })
          }
        </ul>
        <div>
          <Details details={details} weather={weather} />
        </div>
      </>
     );
  }

  export default Display