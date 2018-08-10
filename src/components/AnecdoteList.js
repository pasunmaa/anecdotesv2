import React from 'react'
import PropTypes from 'prop-types'
import Filter from './Filter'
import { actionFor } from '../reducers/anecdoteReducer'
import { notificationSet, notificationReset } from '../reducers/notificationReducer'


class AnecdoteList extends React.Component {
  vote = (id) => () => {
    const anecdotes = this.context.store.getState().anecdotes
    this.context.store.dispatch(
      actionFor.anecdoteVoting(id))
    this.context.store.dispatch(
      notificationSet(
        'You have voted \''+anecdotes.find(a => a.id === id ).content+'\''))
    window.setTimeout(() => this.context.store.dispatch(
      notificationReset()), 5000)
  }

  filteredAnecdotes = (filter) => {
    if (filter.length)
      return this.context.store.getState().anecdotes.filter(
        a => a.content.indexOf(filter) !== -1)
    else
      return this.context.store.getState().anecdotes
  }

  render() {
    const anecdotes = this.filteredAnecdotes(this.context.store.getState().filter)
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} {'  '}
              <button onClick={ this.vote(anecdote.id) }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
