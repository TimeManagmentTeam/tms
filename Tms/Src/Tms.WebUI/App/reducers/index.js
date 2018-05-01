import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import ts from './timeStamps';

export const rootReducer = combineReducers({
    auth,
    user,
    ts
});