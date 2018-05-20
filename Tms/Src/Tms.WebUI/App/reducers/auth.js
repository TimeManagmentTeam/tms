import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/auth';
import {
    USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAIL,
    USER_SUBORDINATES_REQUEST, USER_SUBORDINATES_SUCCESS, USER_SUBORDINATES_FAIL,
    USER_TIMESTAMPS_REQUEST, USER_TIMESTAMPS_SUCCESS, USER_TIMESTAMPS_FAIL
} from '../constants/user';

import AuthHelper from '../utils/authHelper';
import userReducer from './user';

const initialState = {
    user: {
        ts: []
    }
};

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



        //USER__LOAD
        case USER_INFO_REQUEST:
            if (!action.main) {
                return state;
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    isInfoLoading: true,
                    error: null
                }
            };
        case USER_INFO_SUCCESS:
            if (!action.main) {
                return state;
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    isInfoLoading: false,
                    info: action.info
                }
            };
        case USER_INFO_FAIL:
            if (!action.main) {
                return state;
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    isInfoLoading: false,
                    error: action.error
                }
            };



        //USER__LOAD__SUBORDINATES
        case USER_SUBORDINATES_REQUEST:
            if (!action.main) {
                return state;
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    isSubordinatesLoading: true,
                    error: null
                }
            };
        case USER_SUBORDINATES_SUCCESS:
            if (!action.main) {
                return state;
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    isSubordinatesLoading: false,
                    subordinates: action.subordinates
                }
            };
        case USER_SUBORDINATES_FAIL:
            if (!action.main) {
                return state;
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    isSubordinatesLoading: false,
                    error: action.error
                }
            };



        //USER__LOAD__TIMESTAMPS
        case USER_TIMESTAMPS_REQUEST:
            if (!action.main) {
                return state;
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    isTSLoading: true,
                    error: null
                }
            };
        case USER_TIMESTAMPS_SUCCESS:
            if (!action.main) {
                return state;
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    isTSLoading: false,
                    ts: action.timeStamps
                }
            };
        case USER_TIMESTAMPS_FAIL:
            if (!action.main) {
                return state;
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    isTSLoading: false,
                    error: action.error
                }
            };

        default:
            return state;
    }
}