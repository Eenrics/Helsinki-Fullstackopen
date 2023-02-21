import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () =>
            axios.get(baseUrl).then(response => response.data)

export const updateQuote = updatedQuote =>
            axios.put(`${baseUrl}/${updatedQuote.id}`, updatedQuote).then(response => response.data)

export const createQuote = newQuote =>
            axios.post(baseUrl, newQuote).then(response => response.data)