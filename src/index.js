import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import './api/server'

import store from './store';

console.info('Initial state:', store.getState());

const unsubscribe = store.subscribe(() =>
  console.info("State after dispatch:", store.getState())
);

store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' });

console.info("After: ", store.getState());
unsubscribe();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
