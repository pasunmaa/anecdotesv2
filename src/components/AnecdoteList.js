import React from 'react'
import Filter from './Filter'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notificationSet, notificationReset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {
  const vote = (updateid) => () => {
    const { content, votes, id } = props.filteredAnecdotes.find(a => a.id === updateid )
    props.anecdoteVoting(id, content, votes)
    props.notificationSet(
      'You have voted \'' + content + '\'')
    window.setTimeout(() => props.notificationReset(), 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
              has {anecdote.votes} {'  '}
            <button onClick={ vote(anecdote.id) }>
                vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const filteredAnecdotes = (anecdotes, filter) => {
  if (filter.length)
    return anecdotes.filter(
      a => a.content.toLowerCase().indexOf(filter) !== -1)
  else
    return anecdotes
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    filteredAnecdotes: filteredAnecdotes(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  anecdoteVoting,
  notificationSet,
  notificationReset
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
