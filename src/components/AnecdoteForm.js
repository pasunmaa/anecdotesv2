import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  addNote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (content.length)
    {
      e.target.anecdote.value = ''
      this.props.anecdoteCreation(content)
      this.props.showNotification('You have created a new anecodote \''+content+'\'', 5)
    }
    else
      this.props.showNotification('Anekdootti ei saa olla tyhjä', 3)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addNote}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  anecdoteCreation,
  showNotification
}

const AnecdoteFormList = connect(
  null, //mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default AnecdoteFormList