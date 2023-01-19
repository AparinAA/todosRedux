const initialState = [
    // { id: 0, text: 'Learn React', completed: true },
    // { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    // { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
];

const ACTION_TYPE = {
    'todos_todoAdded': 'todos/todoAdded',
    'todos_todoToggled': 'todos/todoToggled',
};

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, curTodos) => Math.max(maxId, curTodos.id), -1);
    return maxId + 1;
}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.todos_todoAdded:
            return [
                ...state,
                {
                    id: nextTodoId(state),
                    text: action.payload,
                    completed: false
                }
            ]
        case ACTION_TYPE.todos_todoToggled:
            return state.map(todo => {
                if (todo.id !== action.payload) {
                    return todo
                }

                return {
                    ...todo,
                    completed: !todo.completed
                }
            });
        default:
            return state;
    };
}