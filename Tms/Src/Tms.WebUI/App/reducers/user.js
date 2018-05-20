import {
    USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAIL,
    USER_SUBORDINATES_REQUEST, USER_SUBORDINATES_SUCCESS, USER_SUBORDINATES_FAIL,
    USER_TIMESTAMPS_REQUEST, USER_TIMESTAMPS_SUCCESS, USER_TIMESTAMPS_FAIL,

    USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAIL,
    USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL,
    USER_REMOVE_REQUEST, USER_REMOVE_SUCCESS, USER_REMOVE_FAIL,

    USER_TIMESTAMPS_EDIT_REQUEST, USER_TIMESTAMPS_EDIT_SUCCESS, USER_TIMESTAMPS_EDIT_FAIL
} from '../constants/user';

const initialState = {
    //isLoading: true
    ts: []
};

export default function userState(state = initialState, action) {
    switch (action.type) {
        //USER__LOAD
        case USER_INFO_REQUEST:
            if (action.main) {
                return state;
            }

            return {
                ...state,
                isInfoLoading: true,
                error: null
            };
        case USER_INFO_SUCCESS:
            if (action.main) {
                return state;
            }

            return {
                ...state,
                isInfoLoading: false,
                info: action.info
            };
        case USER_INFO_FAIL:
            if (action.main) {
                return state;
            }

            return {
                ...state,
                isInfoLoading: false,
                error: action.error
            };



        //USER__LOAD__SUBORDINATES
        case USER_SUBORDINATES_REQUEST:
            if (action.main) {
                return state;
            }

            return {
                ...state,
                isSubordinatesLoading: true,
                error: null
            };
        case USER_SUBORDINATES_SUCCESS:
            if (action.main) {
                return state;
            }

            return {
                ...state,
                isSubordinatesLoading: false,
                subordinates: action.subordinates
            };
        case USER_SUBORDINATES_FAIL:
            if (action.main) {
                return state;
            }

            return {
                ...state,
                isSubordinatesLoading: false,
                error: action.error
            };


        //USER__LOAD__TIMESTAMPS
        case USER_TIMESTAMPS_REQUEST:
            if (action.main) {
                return state;
            }

            return {
                ...state,
                isTSLoading: true,
                error: null
            };
        case USER_TIMESTAMPS_SUCCESS:
            if (action.main) {
                return state;
            }

            return {
                ...state,
                isTSLoading: false,
                ts: action.timeStamps
            };
        case USER_TIMESTAMPS_FAIL:
            if (action.main) {
                return state;
            }

            return {
                ...state,
                isTSLoading: false,
                error: action.error
            };



        //USER__TIMESTAMPS_EDIT
        case USER_TIMESTAMPS_EDIT_REQUEST:
            return {
                ...state,
                isTSEditLoading: true,
                error: null
            };
        case USER_TIMESTAMPS_EDIT_SUCCESS:
            return {
                ...state,
                isTSEditLoading: false
            };
        case USER_TIMESTAMPS_EDIT_FAIL:
            return {
                ...state,
                isTSEditLoading: false,
                error: action.error
            };



        //USER__CREATE
        case USER_CREATE_REQUEST:
            return {
                ...state,
                isCreateLoading: true,
                error: null
            };
        case USER_CREATE_SUCCESS:
            return {
                ...state,
                isCreateLoading: false
            };
        case USER_CREATE_FAIL:
            return {
                ...state,
                isCreateLoading: false,
                error: action.error
            };



        //USER__EDIT
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



        //USER__REMOVE
        case USER_REMOVE_REQUEST:
            return {
                ...state,
                isRemoveLoading: true,
                error: null
            };
        case USER_REMOVE_SUCCESS:
            return {
                ...state,
                isRemoveLoading: false
            };
        case USER_REMOVE_FAIL:
            return {
                ...state,
                isRemoveLoading: false,
                error: action.error
            };



        default:
            return state;
    }
}