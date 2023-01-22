import React from 'react';
import ColorFilters from './ColorFilters';
import StatusFilter from './StatusFilter';
import RemainingTodos from './RemainingTodos';

import { useSelector } from 'react-redux';

const remaingLength = state => state.todos.filter(todo => !todo.completed).length;

const Footer = () => {
    const todosRemaining = useSelector(remaingLength)
    const { status, colors } = useSelector(state => state.filters)

    const onColorChange = (color, changeType) =>
        console.log('Color change: ', { color, changeType })
    const onStatusChange = (status) => console.log('Status change: ', status)

    return (
        <footer className="footer">
            <div className="actions">
                <h5>Actions</h5>
                <button className="button">Mark All Completed</button>
                <button className="button">Clear Completed</button>
            </div>

            <RemainingTodos count={todosRemaining} />
            <StatusFilter value={status} onChange={onStatusChange} />
            <ColorFilters value={colors} onChange={onColorChange} />
        </footer>
    )
}

export default Footer
