import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { sayHiOnDispatch, includeMeaningOfLife } from './exampleAddons/enhancers';
import { print1, print2, print3, asyncThunkMiddleware } from './exampleAddons/middleware';
import thunkMiddleware from 'redux-thunk';

let preloadedState;
const persistedTodosString = localStorage.getItem('todos');
const middleware = [asyncThunkMiddleware]//[thunkMiddleware,];
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
