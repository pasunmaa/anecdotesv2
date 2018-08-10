const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const actionFor = {
  anecdoteCreation(content) {
    //console.log(content)
    return {
      type: 'CREATE',
      data: {
        content,
        votes: 0,
        id: generateId()
      }
    }
  },
  anecdoteVoting(id) {
    return {
      type: 'VOTE',
      data: id
    }
  }
}

const generateId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (store = initialState, action) => {
  switch (action.type) {
  case 'VOTE':
  {
    //console.log(action)
    const old = store.filter(a => a.id !== action.data) // action.data.id)
    const voted = store.find(a => a.id === action.data) // action.data.id)
    //console.log(old, voted)
    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  case 'CREATE':
    //console.log(action)
    return [...store, { ...action.data }]
  default:
    return store
  }
}

export default reducer