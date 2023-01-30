import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveFetchTodos } from '../todos/todosSlice';

function Header(props) {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('idle');
    const dispatch = useDispatch();


    const handleKeyDown = async e => {
        const trimmedText = text.trim();
        if (e.which === 13 && trimmedText) {
            setStatus('loading');
            await dispatch(saveFetchTodos(trimmedText));
            setText('');
            setStatus('idle');
            console.info('!asdad');

        }
    }

    let isLoading = status === 'loading';
    let placeholder = isLoading ? '' : 'What needs to be done?';
    let loader = isLoading ? <div className='loader' /> : null;
    return (
        <header className="header">
            <input
                className="new-todo"
                placeholder={placeholder}
                value={text}
                autoFocus={true}
                onChange={e => setText(e.target.value ?? '')}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
            />
            {loader}
        </header>
    );
}

export default Header;