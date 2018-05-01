import {
    TIME_STAMPS_REQUEST, TIME_STAMPS_SUCCESS, TIME_STAMPS_FAIL,
    TIME_STAMPS_EDIT_REQUEST, TIME_STAMPS_EDIT_SUCCESS, TIME_STAMPS_EDIT_FAIL
} from '../constants/timeStamps';
import history from '../history';


export function load(employeerId, from, to) {
    return (dispatch) => {
        if (employeerId && from && to) {
            dispatch({
                type: TIME_STAMPS_REQUEST
            });

            return fetch(`/api/TimeStamps?employeerId=${employeerId}&from=${from}&to=${to}`)
                .then(res => res.json())
                .then(result => {
                    dispatch({
                        type: TIME_STAMPS_SUCCESS,
                        timeStamps: result.map(timeStamp => {
                            timeStamp.date = new Date(timeStamp.date);
                            return timeStamp;
                        })
                    });
                })
                .catch(error => {
                    dispatch({
                        type: TIME_STAMPS_FAIL,
                        error
                    });
                });
        } else {
            dispatch({
                type: TIME_STAMPS_FAIL,
                error: new Error('Ошибочка')
            });
        }
    };
}




export function edit(employeeId, date, time, id) {
    return (dispatch) => {
        if (employeeId && date && time) {
            dispatch({
                type: TIME_STAMPS_EDIT_REQUEST
            });

            let url = '/api/TimeStamps/Add';
            let formData = new FormData();
            formData.append('dbEmployeeId', employeeId);
            formData.append('date', date);
            formData.append('workedTime', time);
            if (id) {
                formData.append('id', id);
                url = '/api/TimeStamps/Update';
            }

            return fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(result => {
                    dispatch({
                        type: TIME_STAMPS_EDIT_SUCCESS
                    });
                })
                .catch(error => {
                    dispatch({
                        type: TIME_STAMPS_EDIT_FAIL,
                        error
                    });
                });
        } else {
            dispatch({
                type: TIME_STAMPS_EDIT_FAIL,
                error: new Error('Ошибочка')
            });
        }
    };
}