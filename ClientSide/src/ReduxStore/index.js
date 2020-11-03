import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import MyReducer from './Reducer/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
     MyReducer,
    {},
    composeEnhancers(applyMiddleware(thunk))
)

export default store;
