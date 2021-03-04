import { Tooltip } from "bootstrap"
import React from "react"
import { useDispatch } from "react-redux"
import { REMOVE_TODO } from "../redux/types"

const TodoElement = ({text, elementId}) => {

    console.log(text)
    console.log(elementId)

    const dispatch = useDispatch()

    const setAsDone =(k) => {
        console.log(k)
    }

    const removeTodo =(k) => {
        console.log(k)

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
            <button onClick={() => setAsDone(elementId)} class="btn btn-link">Done</button>
            <button onClick={() => removeTodo(elementId)} class="btn btn-link">Remove</button>
        </div>

    </div>)

}

export default TodoElement;