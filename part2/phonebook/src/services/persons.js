import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
    .then(res => res.data)
}

const addPerson = newObject => {
    return axios.post(baseUrl, newObject)
    .then(res => res.data)
}

const updatePerson = (newObject, id) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
    .then(res => res.data)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
    .then(res => res.data)
}

export default { getAll, addPerson, updatePerson, deletePerson }