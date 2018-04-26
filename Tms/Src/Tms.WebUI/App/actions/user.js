import { USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAIL } from '../constants/user';
import history from '../history';


export function loadUserInfo(id) {
    return (dispatch) => {
        if (id) {
            dispatch({
                type: USER_INFO_REQUEST
            });

            fetch(`/api/Employees/Get/${id}`, {
                method: 'POST'
            })
                .then(res => res.json())
                .then(result => {
                    dispatch({
                        type: USER_INFO_SUCCESS,
                        info: result
                    });
                })
                .catch(error => {
                    dispatch({
                        type: USER_INFO_FAIL,
                        error
                    });
                });
        }
    };
}


export function edit(employee) {
    return (dispatch) => {
        if (employee) {
            var formData = new FormData();
            Object.keys(employee).forEach(key => {
                formData.append(key, employee[key]);
            })

            fetch("/api/Employees/Edit", {
                method: "POST",
                body: formData
            })
                .then(result => {
                    history.push('/profile');
                }, (error) => {
                });
        }
    }
}