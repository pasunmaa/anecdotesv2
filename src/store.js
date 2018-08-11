import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  filter: filterReducer,
  notification: notificationReducer,
  anecdotes: anecdoteReducer
})
//console.log(store.getState())

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
