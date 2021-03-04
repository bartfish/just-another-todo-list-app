import { ADD_TODO, REMOVE_TODO } from "../types"


let todos = (() => {

    console.log("getting todos")
    const cachedTodos = localStorage.getItem('todos')
    if (cachedTodos) {
        return JSON.parse(cachedTodos)
    }

    return []
})()

const initialState = {
    todos: todos
}

export function todosReducer(state = initialState, action) {

    // eslint-disable-next-line default-case
    switch(action.type) {
        case ADD_TODO:  
        
            todos.push(action.todo)
            localStorage.setItem('todos', JSON.stringify(todos));

            console.log(state)
            return {
                ...state,
                todos: todos
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