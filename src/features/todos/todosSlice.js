import { client } from '../../api/client';

const initialState = [
    // { id: 0, text: 'Learn React', completed: true },
    // { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    // { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
];

const ACTION_TYPE = {
    'todos_todoAdded': 'todos/todoAdded',
    'todos_todoToggled': 'todos/todoToggled',
    'todos_todoDeleted': 'todos/todoDeleted',
    'todos_todoChangeColor': 'todos/todoChangeColor',
    'todos_todoClearCompleted': 'todos/todoClearCompleted',
    'todos_todoChangeAllCompleted': 'todos/todoChangeAllCompleted',
    'todos_todosLoaded': 'todos/todosLoaded'
};

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.todos_todoAdded:
            return [
                ...state, action.payload
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
        case ACTION_TYPE.todos_todosLoaded:
            return action.payload;
        default:
            return state;
    };
}

export async function fetchTodos(dispatch, getState) {
    console.info("fetch data");
    client.get('/fakeApi/todos').then(res => {
        console.info("!1");
        dispatch({ type: 'todos/todosLoaded', payload: res.todos });
        console.info("!2");
    })
    console.info("!")
}

export function saveFetchTodos(text) {
    return async function innerHandler(dispatch, getState) {
        console.info("save data");
        const initial = { text };
        client.post('/fakeApi/todos', { todo: initial })
            .then(res => {
                if (res.todo) {
                    dispatch({ type: 'todos/todoAdded', payload: res.todo });
                } else {
                    throw Error("Todo hasn't added");
                }
            })
            .catch(e => console.info(e));

    }
}