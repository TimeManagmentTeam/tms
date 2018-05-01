import React from 'react';
import LoginForm from './LoginForm';
import './LoginPage.css';


export default props => (
    <div className="login-form-container">
        {props.auth.isAuthenticated
            ? <div>Добро пожаловать, {props.auth.id}.</div>
            : <LoginForm {...props} />}
    </div>
);
