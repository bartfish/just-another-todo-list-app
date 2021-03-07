import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import TodoElement from "../components/TodoElement"
import { ADD_TODO } from "../redux/types"

export const Dashboard = () => {

    const [currTodo, setToDo] = useState('')

    const dispatch = useDispatch()
    const savedTodos = useSelector(state => state.todosReducer)

    const createToDo = () => {
        let generateId = 1;
        if (savedTodos && savedTodos.todos.length >= 1) {
            generateId = savedTodos.todos[savedTodos.todos.length - 1].elementId + 1;
        }
        
        if (currTodo !== '') {
            dispatch({
                type: ADD_TODO,
                todo: {
                    text: currTodo,
                    elementId: generateId
                }
            })
            setToDo('')
        }
    }

    useEffect(() => {
        document.getElementById('todo-input').onkeyup = function (e) {
            if (e.key === 'Enter') {
                createToDo()
            }
        }
    })

    return (
        <div className="container animate__animated animate__zoomIn animate__duration-3s">
            
            <div className="card-container">
                <div className="done-info text-center">
                    <h2>{savedTodos.doneCounter} / {savedTodos.allCounter}</h2>
                </div>
            </div>

            <div className="card-container">

                <div className="card-header">
                    <h4>Just another ToDo list</h4>
                </div>
                <div className="card-body">
                    <div className="input-container flex-row">
                        <input 
                            id="todo-input"
                            type="text" 
                            className="form-control" 
                            placeholder="Type what you want to do and press enter"
                            value={currTodo} 
                            onChange={(e) => setToDo(e.target.value)} />
                    </div>
                    <ul>
                       { savedTodos ? savedTodos.todos.map(t => (
                            <li>
                                <TodoElement text={t.text} elementId={t.elementId} />
                            </li>
                       )) : null}
                    </ul>
                </div>

            </div>


        </div>
    )
}