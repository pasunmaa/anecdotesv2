import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import anecdoteService from './services/anecdotes'
import App from './App'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer, { anecdoteInitialization } from './reducers/anecdoteReducer'

const reducer = combineReducers({
  filter: filterReducer,
  notification: notificationReducer,
  anecdotes: anecdoteReducer
})

const store = createStore(reducer)
//console.log(store.getState())

anecdoteService.getAll().then(notes =>
  store.dispatch(anecdoteInitialization(notes))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
