import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer
})

const store = createStore(reducer)

//console.log(store.getState())

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App /* store={store} */ />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)