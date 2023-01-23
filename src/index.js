import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux';

import './api/server'

import store from './store';

import { fetchTodos } from './features/todos/todosSlice';

const unsubscribe = store.subscribe(() =>
	console.info("State after dispatch:", store.getState())
);

store.dispatch(fetchTodos);

unsubscribe();


ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
