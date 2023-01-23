import React from 'react';
import Todoelement from './Todoelement';
import { useSelector, shallowEqual } from 'react-redux';

const selectTodos = state => {
    const { status } = state.filters;
    let tempStateTodos;
    switch (status) {
        case 'completed':
            tempStateTodos = state.todos.filter(todo => todo.completed);
            break;
        case 'active':
            tempStateTodos = state.todos.filter(todo => todo.color);
            break;
        default:
            tempStateTodos = state.todos;
    }

    return tempStateTodos.map(todo => todo.id);
}

function Todolist(props) {
    console.info("Re-rendering TodoList");
    const todosId = useSelector(selectTodos, shallowEqual);
    const renderedListItems = todosId.map((id) => {
        return <Todoelement key={id} id={id} props={props} />
    })
    return (
        <ul className="todo-list">{renderedListItems}</ul>
    )
}
export default Todolist;