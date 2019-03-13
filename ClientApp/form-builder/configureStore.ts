import { applyMiddleware, combineReducers, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Store from './store';

import { all, call } from 'redux-saga/effects';
function* rootSaga() { yield all(Store.sagas.map(saga => call(saga))); }

export default function configureStore(initialState?: Store.ApplicationState) {
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [
		sagaMiddleware,
	];

	// In development, use the browser's Redux dev tools extension if installed
	const enhancers = [];
	const w = typeof window === 'undefined' ? null : window as any;
	const isDevelopment = process.env.NODE_ENV === 'development';
	if (isDevelopment && w && w.devToolsExtension as () => StoreEnhancer) {
		enhancers.push(w.devToolsExtension());
	}

	const rootReducer = combineReducers({
		...Store.reducers,
	});

	const store = createStore(
		rootReducer,
		initialState,
		compose(applyMiddleware(...middleware), ...enhancers)
	);

	sagaMiddleware.run(rootSaga);

	return store;
}
