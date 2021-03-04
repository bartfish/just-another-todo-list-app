import { ADD_TODO, REMOVE_TODO, DONE_TODO } from "../types"


let todos = (() => {

    const cachedTodos = localStorage.getItem('todos')
    if (cachedTodos) {
        return JSON.parse(cachedTodos)
    }

    return []
})()

let doneCounter = (() => {

    const cachedDoneCounter = localStorage.getItem('doneCounter')
    if (cachedDoneCounter) {
        return JSON.parse(cachedDoneCounter)
    }

    return []
})()

const initialState = {
    todos: todos,
    doneCounter: doneCounter
}

export function todosReducer(state = initialState, action) {

    // eslint-disable-next-line default-case
    switch(action.type) {
        case ADD_TODO:  
        
            todos.push(action.todo)
            localStorage.setItem('todos', JSON.stringify(todos));

            return {
                ...state,
                todos: todos
            }

        case DONE_TODO:  

            todos = todos.filter(t => t.elementId !== action.todo.elementId)
            localStorage.setItem('todos', JSON.stringify(todos));

            doneCounter++;
            return {
                ...state,
                todos: todos,
                doneCounter: doneCounter
            }

        case REMOVE_TODO:  

            todos = todos.filter(t => t.elementId !== action.todo.elementId)
            localStorage.setItem('todos', JSON.stringify(todos));
            return {
                ...state,
                todos: todos
            }

        default: 
            return { ...state }
    }

}