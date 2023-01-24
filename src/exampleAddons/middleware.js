export const print1 = (storeAPI) => (next) => (action) => {
	console.log('1')
	return next(action)
}

export const print2 = (storeAPI) => (next) => (action) => {
	console.log('2', action.type)
	return next(action)
}

export const print3 = (storeAPI) => (next) => (action) => {
	console.log('3')
	return next(action)
}

// const customMiddleware = storeAPI => next => action => {
// 	...
// }
// export customMiddleware;

export function customMiddleware(storeAPI) {
	return function wrapDispatch(next) {
		return function handleAction(action) {
			if (action.type === 'todos/todoAdded') {
				setTimeout(() => {
					next(action);
					console.info('After 2 second state: ', storeAPI.getState());
				}, 1000);
				console.info('Next state: ', storeAPI.getState());
				return;
			}
			return next(action);
		}
	}
}

export const asyncThunkMiddleware = storeAPI => next => action => {
	console.info(typeof action);
	if (typeof action === 'function') {
		return action(storeAPI.dispatch, storeAPI.getState);
	}
	return next(action);
}