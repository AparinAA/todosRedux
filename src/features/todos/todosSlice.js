import { client } from '../../api/client';
import { createSelector } from 'reselect';

const initialState = {
    status: 'idle', //or: 'loading', 'succeeded', 'failed'
    entities: {}
}
// { id: 0, text: 'Learn React', completed: true },
// { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
// { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }


const ACTION_TYPE = {
    'todos_todoAdded': 'todos/todoAdded',
    'todos_todoToggled': 'todos/todoToggled',
    'todos_todoDeleted': 'todos/todoDeleted',
    'todos_todoChangeColor': 'todos/todoChangeColor',
    'todos_todoClearCompleted': 'todos/todoClearCompleted',
    'todos_todoChangeAllCompleted': 'todos/todoChangeAllCompleted',
    'todos_todosLoaded': 'todos/todosLoaded',
    'todos_todosLoading': 'todos/todosLoading'
};

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.todos_todoAdded: {
            const todo = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [todo.id]: todo
                }
            };
        }
        case ACTION_TYPE.todos_todoToggled: {
            const todoId = action.payload;
            const todo = state.entities[todoId];

            return {
                ...state,
                entities: {
                    ...state.entities,
                    [todoId]: {
                        ...todo,
                        completed: !todo.completed
                    }
                }
            }
        }
        case ACTION_TYPE.todos_todoDeleted: {
            const newEntities = { ...state.entities };
            delete newEntities[action.payload];
            return {
                ...state,
                entities: newEntities
            }
        }
        case ACTION_TYPE.todos_todoChangeColor: {
            const { id, color } = action.payload;
            const todo = state.entities[id];
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [id]: {
                        ...todo,
                        color
                    }
                }
            };
        }
        case ACTION_TYPE.todos_todoChangeAllCompleted: {
            const newEntities = { ...state.entities };
            Object.values(newEntities).forEach(todo => {
                newEntities[todo.id] = {
                    ...todo,
                    completed: true
                }
            })
            return {
                ...state,
                entities: newEntities
            };
        }
        case ACTION_TYPE.todos_todoClearCompleted: {
            const newEntities = { ...state.entities };

            Object.values(newEntities).forEach(todo => {
                if (todo.completed) {
                    delete newEntities[todo.id];
                }
            })

            return {
                ...state,
                entities: newEntities
            }
        }
        case ACTION_TYPE.todos_todosLoading:
            return {
                ...state,
                status: 'loading',
            }
        case ACTION_TYPE.todos_todosLoaded: {
            const newEntities = {};
            action.payload.forEach(todo => {
                newEntities[todo.id] = todo
            });
            return {
                ...state,
                status: 'idle',
                entities: newEntities
            }
        }
        default:
            return state;
    };
}

export const todosLoading = todos => {
    return {
        type: 'todos/todosLoading',
    }
}

export const todosLoaded = todos => {
    return {
        type: 'todos/todosLoaded',
        payload: todos
    }
}

export const fetchTodos = () => async (dispatch) => {
    dispatch(todosLoading());
    client.get('/fakeApi/todos').then(res => {
        dispatch(todosLoaded(res.todos));
    })
}

export const todoAdded = (todo) => {
    return {
        type: 'todos/todoAdded',
        payload: todo
    }
}

export function saveFetchTodos(text) {
    return async function innerHandler(dispatch, getState) {
        console.info("save data");
        const initial = { text };
        return client.post('/fakeApi/todos', { todo: initial })
            .then(res => {
                if (res.todo) {
                    dispatch(todoAdded(res.todo));
                } else {
                    throw Error("Todo hasn't added");
                }
            })
            .catch(e => console.info(e));

    }
}

export const selectTodoEntities = state => state.todos.entities;

export const selectTodos = createSelector(selectTodoEntities, entities =>
    Object.values(entities)
);

export const selectFilteredTodos = createSelector(
    selectTodos,
    state => state.filters,
    (todos, filters) => {
        const { status, colors } = filters;
        const showAllCompletions = status === 'all';
        if (showAllCompletions && colors.length === 0) {
            return todos
        }

        const completedStatus = status === 'completed';
        // Return either active or completed todos based on filter
        return todos.filter(todo => {
            const statusMatches =
                showAllCompletions || todo.completed === completedStatus
            const colorMatches = colors.length === 0 || colors.includes(todo.color)
            return statusMatches && colorMatches
        })
    }
)

export const selectFilteredTodoIds = createSelector(
    // Pass our other memoized selector as an input
    selectFilteredTodos,
    // And derive data in the output selector
    filteredTodos => filteredTodos.map(todo => todo.id)
)

export const selectTodoById = (state, todoId) => {
    return selectTodoEntities(state)[todoId];
}