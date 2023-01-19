import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { sayHiOnDispatch, includeMeaningOfLife } from './exampleAddons/enhancers';

let preloadedState;
const persistedTodosString = localStorage.getItem('todos');

if (persistedTodosString) {
    preloadedState = {
        todos: JSON.parse(persistedTodosString)
    }
}

// TODO 
const store = configureStore({ reducer: rootReducer, preloadedState, enhancers: [sayHiOnDispatch, includeMeaningOfLife] });

export default store;
