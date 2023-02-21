import axios from "axios";

const baseUrl = 'http://localhost:2000/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = {content, votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateQuote = async (object) => {
    const response = await axios.put(`${baseUrl}/${object.id}`, object)
}

export default { getAll, createNew, updateQuote }