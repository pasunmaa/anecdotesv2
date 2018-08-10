import React from 'react'
import Filter from './Filter'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notificationSet, notificationReset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


class AnecdoteList extends React.Component {
  vote = (id) => () => {
    const anecdotes = this.props.anecdotes
    this.props.anecdoteVoting(id)
    this.props.notificationSet(
      'You have voted \''+anecdotes.find(a => a.id === id ).content+'\'')
    window.setTimeout(() => this.props.notificationReset(), 5000)
  }

  filteredAnecdotes = (filter) => {
    if (filter.length)
      return this.props.anecdotes.filter(
        a => a.content.toLowerCase().indexOf(filter) !== -1)
    else
      return this.props.anecdotes
  }

  render() {
    const anecdotes = this.filteredAnecdotes(this.props.filter)
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

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    filter: state.filter,
    //notification: state.notification,
    anecdotes: state.anecdotes
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
