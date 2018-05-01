import {
    TIME_STAMPS_REQUEST, TIME_STAMPS_SUCCESS, TIME_STAMPS_FAIL,
    TIME_STAMPS_EDIT_REQUEST, TIME_STAMPS_EDIT_SUCCESS, TIME_STAMPS_EDIT_FAIL
} from '../constants/timeStamps';

const initialState = {
    data: []
};

export default function timeStampState(state = initialState, action) {
    switch (action.type) {
        case TIME_STAMPS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case TIME_STAMPS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.timeStamps
            };
        case TIME_STAMPS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case TIME_STAMPS_EDIT_REQUEST:
            return {
                ...state,
                isEditLoading: true,
                error: null
            };
        case TIME_STAMPS_EDIT_SUCCESS:
            return {
                ...state,
                isEditLoading: false
            };
        case TIME_STAMPS_EDIT_FAIL:
            return {
                ...state,
                isEditLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}