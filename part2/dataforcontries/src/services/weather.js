import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY

// const weatherUrl = (lat, lon) => `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`
const weatherUrl = (lat, lon) => `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`

const getWeather = (lat, lon) => {
    let url = weatherUrl(lat, lon)
    return axios.get(url)
    .then(res => res.data)
}

export default { getWeather }