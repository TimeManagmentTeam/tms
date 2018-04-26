import { USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAIL } from '../constants/user';

const initialState = {
    isLoading: true
};

export default function userState(state = initialState, action) {
    switch (action.type) {
        case USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                info: {}
            };
        case USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                info: action.info
            };
        case USER_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}