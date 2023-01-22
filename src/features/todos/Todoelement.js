import React from 'react';
import { useSelector } from 'react-redux';

const selectTodoById = (state, id) => {
    return state.todos.find(todo => todo.id === id);
}

function Todoelement({ id }) {
    const { text } = useSelector(state => selectTodoById(state, id));
    return (
        <li>
            <div className='view'>
                <label htmlFor={id}>
                    <input type="checkbox" id={id} />
                    {text}
                </label>
            </div>
        </li>
    );
}

export default Todoelement;