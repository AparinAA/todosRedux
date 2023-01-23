import React from 'react';
import ColorFilters from './ColorFilters';
import StatusFilter from './StatusFilter';
import RemainingTodos from './RemainingTodos';

import { useDispatch, useSelector } from 'react-redux';

const remaingTodosFilter = state => state.todos.filter(todo => !todo.completed).length;

const Footer = () => {
    const remaingLength = useSelector(remaingTodosFilter);
    const allLengthTodo = useSelector(state => state.todos.length);
    const { status, colors } = useSelector(state => state.filters)

    const dispatch = useDispatch();

    const onColorChange = (color, changeType) => console.log('Color change: ', { color, changeType })

    const handlerStatusChange = (status) => {
        dispatch({ type: 'filters/statusFilterChanged', payload: status })
    };


    const handlerClearCompleted = () => {
        if (remaingLength !== allLengthTodo)
            dispatch({ type: 'todos/todoClearCompleted' });
    }

    const hanlerAllCompleted = () => {
        if (remaingLength) {
            dispatch({ type: 'todos/todoChangeAllCompleted', payload: true });
        }
    }

    return (
        <footer className="footer">
            <div className="actions">
                <h5>Actions</h5>
                <button className="button" onClick={hanlerAllCompleted}>Mark All Completed</button>
                <button className="button" onClick={handlerClearCompleted}>Clear Completed</button>
            </div>

            <RemainingTodos count={remaingLength} />
            <StatusFilter value={status} onChange={handlerStatusChange} />
            <ColorFilters value={colors} onChange={onColorChange} />
        </footer>
    )
}

export default Footer
