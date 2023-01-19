// TODO change createStore
import { configureStore } from '@reduxjs/toolkit';
// import { createStore } from 'redux';
import rootReducer from './reducer';

let preloadedState;
const persistedTodosString = localStorage.getItem('todos');

if (persistedTodosString) {
    preloadedState = {
        todos: JSON.parse(persistedTodosString)
    }
}

// TODO 
const store = configureStore({ reducer: rootReducer, preloadedState });
// const store = createStore(rootReducer, preloadedState);

export default store;
