﻿import {
    USER_REQUEST, USER_SUCCESS, USER_FAIL,
    USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL
} from '../constants/user';

const initialState = {
    //isLoading: true
};

export default function userState(state = initialState, action) {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                isInfoLoading: true,
                error: null
            };
        case USER_SUCCESS:
            return {
                ...state,
                isInfoLoading: false,
                info: action.info
            };
        case USER_FAIL:
            return {
                ...state,
                isInfoLoading: false,
                error: action.error
            };

        case USER_EDIT_REQUEST:
            return {
                ...state,
                isEditLoading: true,
                error: null
            };
        case USER_EDIT_SUCCESS:
            return {
                ...state,
                isEditLoading: false
            };
        case USER_EDIT_FAIL:
            return {
                ...state,
                isEditLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}