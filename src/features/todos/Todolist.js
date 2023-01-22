import React from 'react';
import Todoelement from './Todoelement';
import { useSelector, shallowEqual } from 'react-redux';

const selectTodos = state => state.todos.map(todo => todo.id);

function Todolist(props) {
    const todosId = useSelector(selectTodos, shallowEqual);
    const renderedListItems = todosId.map((id) => {
        return <Todoelement key={id} id={id} props={props} />
    })
    return (
        <ul className="todo-list">{renderedListItems}</ul>
    )
}
export default Todolist;