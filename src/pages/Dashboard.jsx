import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import TodoElement from "../components/TodoElement"
import { ADD_TODO } from "../redux/types"

export const Dashboard = () => {

    const [currTodo, setToDo] = useState('')

    const dispatch = useDispatch()
    const savedTodos = useSelector(state => state.todosReducer.todos)

    const createToDo = () => {
        let generateId = 1;
        if (savedTodos && savedTodos.length >= 1) {
            generateId = savedTodos[savedTodos.length - 1].elementId + 1;
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

    return (
        <div className="container">
            
            <div className="d-flex flex-row w-75 ml-5">
                <span class="p-2 done-info">Done: </span>
            </div>


            <div className="card-container">

                <div className="card-header">
                    <h4>Just another to do list</h4>
                </div>
                <div className="card-body">
                    <div className="input-container flex-row">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={currTodo} 
                            onChange={(e) => setToDo(e.target.value)} />

                        <button 
                            className="btn btn-primary"
                            onClick={() => createToDo()}>Create</button>
                    </div>
                    <ul>
                       { savedTodos ? savedTodos.map(t => (
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