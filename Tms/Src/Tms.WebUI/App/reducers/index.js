import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux';
import auth from './auth';
import user from './user';

export const rootReducer = combineReducers({
   // routing: routerReducer,
    auth,
    user
});