import React from 'react';
import Todoelement from './Todoelement';

function Todolist(props) {
    const todos = [];

    const renderedListItems = todos.map((todo) => {
        return <Todoelement key={todo.id} todo={todo} />
    })
    return (
        <ul className="todo-list">{renderedListItems}</ul>
    )
}
export default Todolist;