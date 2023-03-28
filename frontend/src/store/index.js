import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
    // add reducers as key-value pairs later
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    // we don't import this up top
    const logger = require('redux-logger').default;
    // devtools compose or redux compose if devtools not installed
    // use one of the composes
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState={}) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;