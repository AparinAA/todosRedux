import React from 'react';
import ColorFilters from './ColorFilters';
import StatusFilter from './StatusFilter';
import RemainingTodos from './RemainingTodos';
import { colorFilters } from '../filters/filtersSlice';
import { selectTodos } from '../todos/todosSlice';
import { createSelector } from 'reselect';

import { useDispatch, useSelector } from 'react-redux';

const remaingTodosFilter = createSelector(
    selectTodos,
    todos => todos.filter(todo => !todo.completed).length
);

const Footer = () => {
    const remaingLength = useSelector(remaingTodosFilter);
    const todo = useSelector(selectTodos);
    const allLengthTodo = todo.length;
    const { status, colors } = useSelector(state => state.filters)

    const dispatch = useDispatch();

    const onColorChange = (color, changeType) => {

        colorFilters(color, changeType);
    }

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
