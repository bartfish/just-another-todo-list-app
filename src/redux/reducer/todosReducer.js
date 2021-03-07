import { ADD_TODO, REMOVE_TODO, DONE_TODO } from "../types"
import { TASK_STATUS } from "../../utils/constants"


let todos = (() => {

    const cachedTodos = localStorage.getItem('todos')
    if (cachedTodos) {
        return JSON.parse(cachedTodos)
    }

    return []

})()

let doneTodos = (() => {

    const cachedTodos = localStorage.getItem('doneTodos')
    if (cachedTodos) {
        return JSON.parse(cachedTodos)
    }

    return []
    
})()

let removedTodos = (() => {

    const cachedTodos = localStorage.getItem('removedTodos')
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
    allCounter: allCounter,
    doneTodos: doneTodos,
    removedTodos: removedTodos
}

export function todosReducer(state = initialState, action) {

    // eslint-disable-next-line default-case
    switch(action.type) {
        case ADD_TODO:  

            action.todo.status = TASK_STATUS.TO_BE_DONE
            todos.push(action.todo)
            localStorage.setItem('todos', JSON.stringify(todos));
            allCounter++

            return {
                ...state,
                todos: todos,
                allCounter: allCounter
            }

        case DONE_TODO:  
            
            // add to done list
            let doneTodo = todos.filter(t => t.elementId === action.todo.elementId)[0]
            if (doneTodo) {
                doneTodo.status = TASK_STATUS.DONE
                doneTodos.push(doneTodo)
            }
            localStorage.setItem('doneTodos', JSON.stringify(doneTodos));

            // remove from to do list
            todos = todos.filter(t => t.elementId !== action.todo.elementId)
            localStorage.setItem('todos', JSON.stringify(todos));
            doneCounter++;

            return {
                ...state,
                todos: todos,
                doneCounter: doneCounter
            }

        case REMOVE_TODO:  

            // add to done list
            let rmTodo = todos.filter(t => t.elementId === action.todo.elementId)[0]
            if (rmTodo) {
                rmTodo.status = TASK_STATUS.REMOVED
                removedTodos.push(rmTodo)
            }
            localStorage.setItem('removedTodos', JSON.stringify(removedTodos));

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