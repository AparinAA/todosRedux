import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { sayHiOnDispatch, includeMeaningOfLife } from './exampleAddons/enhancers';
import { print1, print2, print3 } from './exampleAddons/middleware';

let preloadedState;
const persistedTodosString = localStorage.getItem('todos');
const middleware = [print1, print2, print3];
const enhancers = [sayHiOnDispatch, includeMeaningOfLife];
const reducer = rootReducer;

if (persistedTodosString) {
    preloadedState = {
        todos: JSON.parse(persistedTodosString)
    }
}

// TODO 
const store = configureStore({ reducer, preloadedState, middleware, enhancers });

export default store;
