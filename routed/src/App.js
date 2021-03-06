import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

const Navi = () => {
  const menuStyle = {
    backgroundColor: 'lightblue',
    padding: 10
  }
  const activeStyle = {
    color: 'white',
    backgroundColor: 'black',
    padding: 10
  }

  return (
    <div style={menuStyle}>
      <NavLink exact activeStyle={activeStyle} to="/">anecdotes</NavLink> &nbsp;
      <NavLink exact activeStyle={activeStyle} to="/create">create new</NavLink> &nbsp;
      <NavLink exact activeStyle={activeStyle} to="/about">about</NavLink>
    </div>
  )
}

const Notification = (props) => {
  const notificateStyle = {
    maxHeight: 45,
    minHeight: 45,
    marginTop: 10,
    marginBottom: 1,
    paddingLeft: 5,
    color: 'green',
    border: '2px solid #4CAF50',
    borderRadius: 10,
    lineHeight: 3,
    fontSize: 15,
    visibility: 'hidden'
  }
  if (props.message !== '')
    notificateStyle.visibility = 'visible'
  return(
    <div>
      <p style={notificateStyle}>{props.message}</p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      <ul>
        {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} >
          <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
        </ListGroupItem>
        )}
      </ul>
    </ListGroup>
  </div>
)

const Show = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={8}>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>
          <p></p>
          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col xs={6} md={4}>
          <img src="https://i.pinimg.com/564x/34/1d/99/341d9919bc749b2c52a3a8e64190363b.jpg"
            width="40%" height="40%"
            alt="Linux Torvald" />
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/pasunmaa/anecdotesv2/tree/master/routed'>
      https://github.com/pasunmaa/anecdotesv2/tree/master/routed</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      activefield: ''
    }
  }

  handleChange = (e) => {
    //console.log(e.target.name, e.target.value)
    this.setState({ activefield: [e.target.name] })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  getValidationState() {
    //console.log(this.state.activefield)
    if (this.state.activefield.length) {
      const length = this.state[this.state.activefield].length
      if (length > 2) return 'success'
      else if (length > 0) return 'warning'
      else if (length === 0) return 'error'
    }
    return null
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Anecdote content</ControlLabel>
            <FormControl
              type='text'
              name='content'
              placeholder='insert anecdote'
              value={this.state.content}
              onChange={this.handleChange}
            />
            <ControlLabel>Anecdote author</ControlLabel>
            <FormControl
              type='text'
              name='author'
              placeholder='insert author'
              value={this.state.author}
              onChange={this.handleChange}
            />
            <ControlLabel>Anecdote URL</ControlLabel>
            <FormControl
              type='text'
              name='info'
              placeholder='insert info url'
              value={this.state.info}
              onChange={this.handleChange}
            />
            <Button
              onClick={this.handleSubmit}
              bsStyle="success">create
            </Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.showNotification(`a new anecdote ${anecdote.content} created.`)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => Number(a.id) === Number(id))

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  showNotification = (message) => {
    this.setState({ notification: message })
    setTimeout(() => this.setState({ notification: '' }), 10000)
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <Navi />
            <Notification message={this.state.notification}/>
            <Route exact path="/" render={() =>
              <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Show anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App
