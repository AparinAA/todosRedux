import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveFetchTodos } from '../todos/todosSlice';

function Header(props) {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleKeyDown = e => {
        const trimmedText = text.trim();
        if (e.which === 13 && trimmedText) {
            dispatch(saveFetchTodos(trimmedText));
            setText('');
        }
    }

    return (
        <header className="header">
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={text}
                onChange={e => setText(e.target.value ?? '')}
                onKeyDown={handleKeyDown}
            />
        </header>
    );
}

export default Header;