import { Tooltip } from "bootstrap"
import React from "react"
import { useDispatch } from "react-redux"
import { REMOVE_TODO, DONE_TODO } from "../redux/types"

const TodoElement = ({text, elementId}) => {

    const dispatch = useDispatch()

    const setAsDone =(k) => {

        dispatch({
            type: DONE_TODO,
            todo: {
                elementId: k
            }
        })
    }

    const removeTodo =(k) => {

        dispatch({
            type: REMOVE_TODO,
            todo: {
                elementId: k
            }
        })
    }

    return (
        <div className="d-flex flex-row">

        <div class="p-2">{ text }</div>

        <div class="ml-auto p-2 actions">
            <button 
                onClick={() => setAsDone(elementId)} 
                class="done-btn btn btn-link">
                    Done</button>
            <button 
                onClick={() => removeTodo(elementId)} 
                class=" remove-btn btn btn-link">
                    Remove</button>
        </div>

    </div>)

}

export default TodoElement;