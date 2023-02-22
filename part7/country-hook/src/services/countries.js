import axios from "axios";

const baseUrl = 'https://restcountries.com/v3.1/all'
const detailUrl = 'https://restcountries.com/v3.1/name'

const getAll = () => {
    return axios.get(baseUrl)
    .then(res => res.data)
}

const getDetail = (name) => {
    return axios.get(`${detailUrl}/${name}`)
    .then(res => res.data[0])
}


export default { getAll, getDetail }