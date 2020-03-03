import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

import reducers from './reducers';

const rootReducer = combineReducers(reducers);

const middlewares = process.env.NODE_ENV === 'development' ? [thunk, logger]: [thunk];

const middleware = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(
    rootReducer, middleware
);

export default store;