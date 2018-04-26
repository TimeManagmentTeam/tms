import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/auth';
import AuthHelper from '../utils/authHelper';

const initialState = {};

if (AuthHelper.isLogged()) {
    initialState.email = AuthHelper.getLogin();
    initialState.isAuthenticated = true;
}

export default function authState(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                error: null,
                waitingLogin: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                email: action.email,
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
                email: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
}