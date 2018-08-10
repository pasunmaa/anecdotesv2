import React from 'react'
import PropTypes from 'prop-types'
import { actionFor } from '../reducers/anecdoteReducer'
import { notificationSet, notificationReset } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (content.length)
    {
      this.context.store.dispatch(
        actionFor.anecdoteCreation(content))
      e.target.anecdote.value = ''
      this.context.store.dispatch(
        notificationSet('You have created a new anecodote \''+content+'\''))
    }
    else
      this.context.store.dispatch(
        notificationSet('Anekdootti ei saa olla tyhjä'))
    window.setTimeout(() => this.context.store.dispatch(
      notificationReset()), 5000)

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

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}
export default AnecdoteForm
