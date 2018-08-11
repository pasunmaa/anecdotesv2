import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

// Backgend generates id
//const generateId = () => (100000*Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content, votes: 0/* , id: generateId()  */ })
  return response.data
}

const anecdoteVote = async (id, content, votes) => {
  //console.log(id, content, votes)
  const updatedAnecdote = { id, content, votes: votes+1 }
  //console.log(url+'/'+id, updatedAnecdote)
  return axios.put(url+'/'+id, updatedAnecdote)
}

export default { getAll, createNew, anecdoteVote }