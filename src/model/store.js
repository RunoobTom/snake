import {combineReducers, createStore} from 'redux';
import { initReducer } from './reducer';

const reducer = combineReducers({
    initReducer
});

const store = createStore(reducer);
export default store;