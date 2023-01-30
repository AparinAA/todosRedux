import React from 'react';
import Todoelement from './Todoelement';
import { useSelector } from 'react-redux';
import { selectFilteredTodoIds } from './todosSlice';

function Todolist(props) {
    console.info("Re-rendering TodoList");
    const todosId = useSelector(selectFilteredTodoIds);
    const loadingStatus = useSelector(state => state.todos.status);

    if (loadingStatus === 'loading') {
        return <div className='todo-list'><div className="loader" /></div>
    }

    const renderedListItems = todosId.map((id) => {
        return <Todoelement key={id} id={id} props={props} />
    })
    return (
        <ul className="todo-list">{renderedListItems}</ul>
    )
}
export default Todolist;