import { combineReducers } from 'redux'
import { todosReducer } from "./todosReducer"

const reducer = combineReducers({
    todosReducer,
})

export default reducer;