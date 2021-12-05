import { createStore, applyMiddleware, compose } from 'redux';
import lwMiddleware from './middleware/lwMiddleware';
import reducers from './reducers/combine';


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//export const store = createStore(reducers, {}, applyMiddleware(thunk));
export const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(lwMiddleware)));