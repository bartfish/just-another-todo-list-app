import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import TodoElement from "../components/TodoElement"
import { ADD_TODO } from "../redux/types"
import { TASK_STATUS } from "../utils/constants"

export const Dashboard = () => {

    const [currTodo, setToDo] = useState('')
    const [showType, setShowType] = useState(TASK_STATUS.TO_BE_DONE)

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

    const showToBeDone = () => {
        setShowType(TASK_STATUS.TO_BE_DONE)
    }

    const showDone = () => {
        setShowType(TASK_STATUS.DONE)
    }

    const showRemoved = () => {
        setShowType(TASK_STATUS.REMOVED)
    }

    return (
        <div className="container animate__animated animate__zoomIn animate__duration-3s">
            
            <div className="card-container">
                <div className="done-info text-center">
                    <h2>{savedTodos.doneTodos.length} / {savedTodos.allCounter}</h2>
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
                    
                       { showType === TASK_STATUS.TO_BE_DONE ? 
                            savedTodos ? savedTodos.todos.map(t => (
                            <li>
                                <TodoElement text={t.text} elementId={t.elementId} />
                            </li>
                            ))
                            : null
                            : null
                        }

                        { showType === TASK_STATUS.DONE ? 
                            savedTodos ? savedTodos.doneTodos.map(t => (
                            <li>
                                <TodoElement text={t.text} status={TASK_STATUS.DONE} />
                            </li>
                            ))
                            : null
                            : null
                        }

                        { showType === TASK_STATUS.REMOVED ? 
                            savedTodos ? savedTodos.removedTodos.map(t => (
                            <li>
                                <TodoElement text={t.text} status={TASK_STATUS.REMOVED} />
                            </li>
                            ))
                            : null
                            : null
                        }

                    </ul>
                </div>

                <div className="row">
                    <button 
                        class={(showType === TASK_STATUS.TO_BE_DONE ? "active" : "") + " col-4 btn-tab tobedone"}
                        onClick={() => showToBeDone()}>
                            To be done ({savedTodos.todos.length})
                    </button>

                    <button 
                        class={(showType === TASK_STATUS.DONE ? "active" : "") + " col-4 btn-tab done"}
                        onClick={() => showDone()}>
                            Done ({savedTodos.doneTodos.length})
                    </button>

                    <button 
                        class={(showType === TASK_STATUS.REMOVED ? "active" : "") + " col-4 btn-tab removed"}
                        onClick={() => showRemoved()}>
                            Removed ({savedTodos.removedTodos.length})
                    </button>
                </div>

            </div>


        </div>
    )
}