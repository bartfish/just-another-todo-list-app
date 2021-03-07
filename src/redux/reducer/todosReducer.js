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

    return 0
})()

let allCounter = (() => {

    const cachedAllCounter = localStorage.getItem('allCounter')
    if (cachedAllCounter) {
        return JSON.parse(cachedAllCounter)
    }

    return 0
})()

const initialState = {
    todos: todos,
    doneCounter: doneCounter,
    allCounter: allCounter
}

export function todosReducer(state = initialState, action) {

    // eslint-disable-next-line default-case
    switch(action.type) {
        case ADD_TODO:  
        
            todos.push(action.todo)
            localStorage.setItem('todos', JSON.stringify(todos));
            allCounter++

            return {
                ...state,
                todos: todos,
                allCounter: allCounter
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

            allCounter = allCounter > 1 ? allCounter - 1 : 0;
            return {
                ...state,
                todos: todos,
                allCounter: allCounter
            }

        default: 
            return { ...state }
    }

}