import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationSet, notificationReset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (content.length)
    {
      this.props.anecdoteCreation(content)
      e.target.anecdote.value = ''
      this.props.notificationSet('You have created a new anecodote \''+content+'\'')
    }
    else
      this.props.notificationSet('Anekdootti ei saa olla tyhjä')
    window.setTimeout(() => this.props.notificationReset(), 5000)

  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

/* const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    notification: state.notification,
    anecdotes: state.anecdotes
  }
} */

const mapDispatchToProps = {
  anecdoteCreation,
  notificationSet,
  notificationReset
}

const AnecdoteFormList = connect(
  null, //mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default AnecdoteFormList