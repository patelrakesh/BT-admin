import rootReducers from './reducers';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
const middlewares = [thunk];

const configureStore = createStore(rootReducers, applyMiddleware(...middlewares));


export default configureStore;
