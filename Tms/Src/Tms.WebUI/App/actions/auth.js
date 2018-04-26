import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/auth';
import AuthHelper from '../utils/authHelper';
import history from '../history';


export function login({ email, passHash }) {
    return (dispatch) => {
        if (email && passHash) {
            dispatch({
                type: LOGIN_REQUEST
            });

            let formData = new FormData();
            formData.append('email', email);
            formData.append('passHash', passHash);

            fetch('/Auth/Login', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(result => {
                    if (result.isSuccess) {
                        AuthHelper.saveAuth(result.id, result.token);
                        history.push('/profile');
                        dispatch({
                            type: LOGIN_SUCCESS,
                            email: result.id
                        });
                    } else {
                        throw new Error('Направильный пароль или почта');
                    }
                })
                .catch(error => {
                    dispatch({
                        type: LOGIN_FAIL,
                        error
                    });
                });
        }
    };
}

export function logout() {
    AuthHelper.clearAuth();
    history.push('/');
    return {
        type: LOGOUT_SUCCESS
    };
}
