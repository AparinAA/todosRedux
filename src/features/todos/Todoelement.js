import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as TimesSolid } from './time-solid.svg';
import { availableColors, capitalize } from '../filters/colors';

const selectTodoById = (state, id) => {
    return state.todos.find(todo => todo.id === id);
}

function Todoelement({ id }) {
    const todo = useSelector(state => selectTodoById(state, id));
    const { text, completed, color } = todo;

    const dispatch = useDispatch();

    const colorOptions = availableColors.map(c => <option value={c} key={c}>{capitalize(c)}</option>);

    const handlerChangeCompleted = () => {
        dispatch({ type: "todos/todoToggled", payload: todo.id });
    }

    const handlerDestroy = () => {
        dispatch({ type: "todos/todoDeleted", payload: id });
    }

    const handlerChangeColor = (e) => {
        dispatch({ type: "todos/todoChangeColor", payload: { id, color: e.target.value } })
    }

    return (
        <li>
            <div className='view'>
                <input
                    className="toggle"
                    type="checkbox"
                    id={id}
                    onClick={handlerChangeCompleted}
                />
                <label className="todo-text" htmlFor={id}>{text}</label>

                <select
                    className="colorPicker"
                    value={color}
                    style={{ color }}
                    onChange={handlerChangeColor}
                >
                    <option value=""></option>
                    {colorOptions}
                </select>

                <button className='destroy' onClick={handlerDestroy}><TimesSolid /></button>
            </div>
        </li>
    );
}

export default Todoelement;