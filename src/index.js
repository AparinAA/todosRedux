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

const unsubscribe2 = store.subscribe(() =>
  console.info("State after dispatch 2:", store.getState())
);

store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' });

unsubscribe();

store.dispatch({ type: 'todos/todoToggled', payload: 0 });

unsubscribe2();
console.info('Final state:', store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
