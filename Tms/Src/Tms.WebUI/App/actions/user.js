import {
    USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAIL,
    USER_SUBORDINATES_REQUEST, USER_SUBORDINATES_SUCCESS, USER_SUBORDINATES_FAIL,
    USER_TIMESTAMPS_REQUEST, USER_TIMESTAMPS_SUCCESS, USER_TIMESTAMPS_FAIL,

    USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAIL,
    USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL,
    USER_REMOVE_REQUEST, USER_REMOVE_SUCCESS, USER_REMOVE_FAIL,

    USER_TIMESTAMPS_EDIT_REQUEST, USER_TIMESTAMPS_EDIT_SUCCESS, USER_TIMESTAMPS_EDIT_FAIL
} from '../constants/user';

import history from '../history';
import AuthHelper from '../utils/authHelper';


export function load(id) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: USER_INFO_REQUEST,
                main: id === AuthHelper.getId()
            });

            fetch(`/api/Employees/Get/${id}`)
                .then(res => res.json())
                .then(result => {
                    dispatch({
                        type: USER_INFO_SUCCESS,
                        info: result,
                        main: id === AuthHelper.getId()
                    });

                    resolve(result);
                })
                .catch(error => {
                    dispatch({
                        type: USER_INFO_FAIL,
                        error,
                        main: id === AuthHelper.getId()
                    });

                    reject(error);
                })
        });
}


export function create(employee) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: USER_CREATE_REQUEST
            });

            let formData = new FormData(employee);

            fetch('/api/Employees/Add', {
                method: 'POST',
                body: formData
            })
                .then(result => {
                    dispatch({
                        type: USER_CREATE_SUCCESS
                    });

                    resolve();
                }, error => {
                    dispatch({
                        type: USER_CREATE_FAIL,
                        error
                    });

                    reject(error);
                });
        });
}


export function edit(employee) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: USER_EDIT_REQUEST
            });

            let formData = new FormData();
            Object.keys(employee).forEach(key => {
                formData.append(key, employee[key]);
            });

            fetch('/api/Employees/Edit', {
                method: 'POST',
                body: formData
            })
                .then(result => {
                    dispatch({
                        type: USER_EDIT_SUCCESS
                    });

                    resolve();
                }, error => {
                    dispatch({
                        type: USER_EDIT_FAIL,
                        error
                    });

                    reject(error);
                });
        });
}


export function remove(id) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: USER_REMOVE_REQUEST
            });

            fetch(`/api/Employees/Delete/${id}`, {
                method: 'POST'
            })
                .then(result => {
                    dispatch({
                        type: USER_REMOVE_SUCCESS
                    });

                    resolve();
                }, error => {
                    dispatch({
                        type: USER_REMOVE_FAIL,
                        error
                    });

                    reject(error);
                });
        });
}


export function loadSubordinates(from, to) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: USER_SUBORDINATES_REQUEST,
                main: true
            });

            fetch('/api/Employees/GetSubordinates', {
                headers: {
                    Authorization: `bearer ${AuthHelper.getToken()}`
                }
            })
                .then(res => res.json())
                .then(result => {
                    let prs = [];

                    result.forEach(sub => {
                        let pr = new Promise((resolvee, reject) => {
                            fetch(`/api/TimeStamps?employeerId=${sub.id}&from=${from}&to=${to}`)
                                .then(res => res.json())
                                .then(result => {
                                    let timeStamps = result.map(timeStamp => {
                                        timeStamp.date = new Date(timeStamp.date);
                                        return timeStamp;
                                    });

                                    resolvee(timeStamps);
                                });
                        });

                        prs.push(pr);
                    });

                    return Promise.all(prs)
                        .then(values => {
                            let subordinates = result.map((subordinate, index) => {
                                return {
                                    ...subordinate,
                                    ts: values[index]
                                };
                            });

                            dispatch({
                                type: USER_SUBORDINATES_SUCCESS,
                                subordinates,
                                main: true
                            });

                            resolve(subordinates);
                        });

                }, error => {
                    dispatch({
                        type: USER_SUBORDINATES_FAIL,
                        error,
                        main: true
                    });

                    reject(error);
                });
        });
}


export function loadTimeStamps(employeerId, from, to) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: USER_TIMESTAMPS_REQUEST,
                main: employeerId === AuthHelper.getId()
            });

            fetch(`/api/TimeStamps?employeerId=${employeerId}&from=${from}&to=${to}`)
                .then(res => res.json())
                .then(result => {
                    let timeStamps = result.map(timeStamp => {
                        timeStamp.date = new Date(timeStamp.date);
                        return timeStamp;
                    });

                    dispatch({
                        type: USER_TIMESTAMPS_SUCCESS,
                        timeStamps,
                        main: employeerId === AuthHelper.getId()
                    });

                    resolve(timeStamps);
                })
                .catch(error => {
                    dispatch({
                        type: USER_TIMESTAMPS_FAIL,
                        error,
                        main: employeerId === AuthHelper.getId()
                    });

                    reject(error);
                });
        });
}


export function editTimeStamps(employeeId, date, time, id) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: USER_TIMESTAMPS_EDIT_REQUEST
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

            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(result => {
                    dispatch({
                        type: USER_TIMESTAMPS_EDIT_SUCCESS
                    });

                    resolve();
                })
                .catch(error => {
                    dispatch({
                        type: USER_TIMESTAMPS_EDIT_FAIL,
                        error
                    });

                    reject(error);
                });
        });
}