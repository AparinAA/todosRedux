export const print1 = (storeAPI) => (next) => (action) => {
	console.log('1')
	return next(action)
}

export const print2 = (storeAPI) => (next) => (action) => {
	console.log('2')
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
			console.info("This is log of a custom middleware:", action);
			console.info("Before 'next':", storeAPI.getState());
			setTimeout(() => {
				console.info('After 2 second state: ', storeAPI.getState());
			}, 2000);
			const result = next(action);
			console.info('Next state: ', storeAPI.getState());

			return result;
		}
	}
}