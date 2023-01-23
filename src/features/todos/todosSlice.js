const initialState = [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
];

const ACTION_TYPE = {
    'todos_todoAdded': 'todos/todoAdded',
    'todos_todoToggled': 'todos/todoToggled',
    'todos_todoDeleted': 'todos/todoDeleted',
    'todos_todoChangeColor': 'todos/todoChangeColor',
    'todos_todoClearCompleted': 'todos/todoClearCompleted',
    'todos_todoChangeAllCompleted': 'todos/todoChangeAllCompleted'
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
                },
            ];
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
        case ACTION_TYPE.todos_todoDeleted:
            return state.filter(todo => todo.id !== action.payload);
        case ACTION_TYPE.todos_todoChangeColor:
            const { id, color } = action.payload;
            return state.map(todo => {
                if (todo.id !== id) {
                    return todo;
                }

                return {
                    ...todo,
                    color
                }
            });
        case ACTION_TYPE.todos_todoChangeAllCompleted:
            return state.map(todo => {
                return { ...todo, completed: action.payload };
            });
        case ACTION_TYPE.todos_todoClearCompleted:
            return state.filter(todo => !todo.completed);
        default:
            return state;
    };
}