import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import myPage from '../MyPage/reducer';

const rootReducer = combineReducers({
    myPage
});


const middlewares = [thunk, logger];
const middleware = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(
    rootReducer, middleware
);

export default store;