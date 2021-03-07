import React from "react"
import { useDispatch } from "react-redux"
import { REMOVE_TODO, DONE_TODO } from "../redux/types"

const TodoElement = ({text, elementId, status}) => {

    const dispatch = useDispatch()

    const setAsDone = (k) => {
        dispatch({
            type: DONE_TODO,
            todo: {
                elementId: k
            }
        })
    }

    const removeTodo = (k) => {
        dispatch({
            type: REMOVE_TODO,
            todo: {
                elementId: k
            }
        })
    }

    return (
        <div className="d-flex flex-row">

        <div className="p-2">{ text }</div>

        { status 
            ? null : 
            <div className="ml-auto p-2 actions">
                <button 
                    onClick={() => setAsDone(elementId)} 
                    className="done-btn btn btn-link">
                        Done</button>
                <button 
                    onClick={() => removeTodo(elementId)} 
                    className=" remove-btn btn btn-link">
                        Remove</button>
            </div>
        }

    </div>)

}

export default TodoElement;