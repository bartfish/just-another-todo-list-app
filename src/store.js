import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './redux/reducer/index'

const enhancers = compose(
  applyMiddleware(thunk)
)
const store = createStore(reducer, enhancers)

export default store
export const { getState } = store
