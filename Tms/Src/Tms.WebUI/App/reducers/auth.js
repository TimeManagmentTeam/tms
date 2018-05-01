import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/auth';
import AuthHelper from '../utils/authHelper';

const initialState = {};

if (AuthHelper.isLogged()) {
    initialState.id = AuthHelper.getId();
    initialState.isAuthenticated = true;
}

export default function authState(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                waitingLogin: true,
                error: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                id: action.id,
                isAuthenticated: true,
                waitingLogin: false
            };
        case LOGIN_FAIL:
            return {
                ...state,
                waitingLogin: false,
                error: action.error
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                id: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
}