﻿import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/auth';
import JwtDecode from 'jwt-decode';
import AuthHelper from '../utils/authHelper';
import history from '../history';


export function login({ email, pass }) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: LOGIN_REQUEST
            });

            let passHash = pass; //надо захешировать

            let authData = new FormData();
            authData.append('email', email);
            authData.append('passHash', passHash);

            fetch('/Auth/Login', {
                method: 'POST',
                body: authData
            })
                .then(res => res.json())
                .then(result => {
                    if (!result.isSuccess) {
                        return Promise.reject(new Error('Направильный пароль или почта'));
                    }
                    let data = JwtDecode(result.token);
                    AuthHelper.saveAuth(data.Id, result.token);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        id: data.Id
                    });
                    //history.push('/profile');

                    resolve({ id: data.Id, token: result.token });
                })
                .catch(error => {
                    dispatch({
                        type: LOGIN_FAIL,
                        error
                    });

                    reject(error);
                });
        });
}

export function logout() {
    AuthHelper.clearAuth();
    history.push('/');
    return {
        type: LOGOUT_SUCCESS
    };
}
