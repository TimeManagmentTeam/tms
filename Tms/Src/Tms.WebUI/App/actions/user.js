import {
    USER_REQUEST, USER_SUCCESS, USER_FAIL,
    USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL
} from '../constants/user';
import history from '../history';


export function load(id) {
    return (dispatch) => {
        if (id) {
            dispatch({
                type: USER_REQUEST
            });

            fetch(`/api/Employees/Get/${id}`, {
                method: 'POST'
            })
                .then(res => res.json())
                .then(result => {
                    dispatch({
                        type: USER_SUCCESS,
                        info: result
                    });
                })
                .catch(error => {
                    dispatch({
                        type: USER_FAIL,
                        error
                    });
                });
        } else {
            dispatch({
                type: USER_FAIL,
                error: new Error('Ошибочка')
            });
        }
    };
}


export function edit(employee) {
    return (dispatch) => {
        if (employee) {
            dispatch({
                type: USER_EDIT_REQUEST
            });

            let formData = new FormData();
            Object.keys(employee).forEach(key => {
                formData.append(key, employee[key]);
            });

            fetch("/api/Employees/Edit", {
                method: "POST",
                body: formData
            })
                .then(result => {
                    dispatch({
                        type: USER_EDIT_SUCCESS
                    });
                    history.push('/profile');
                }, (error) => {
                    dispatch({
                        type: USER_EDIT_FAIL,
                        error
                    });
                });
        } else {
            dispatch({
                type: USER_EDIT_FAIL,
                error: new Error('Ошибочка')
            });
        }
    };
}