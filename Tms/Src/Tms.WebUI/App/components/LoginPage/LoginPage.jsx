import React from 'react';
import Page from './../common/Page';
import LoginForm from './LoginForm';
import './LoginPage.css';


export default props => (
    <Page title="Авторизация" {...props} >
        <div className="login-form-container">
            {props.auth.isAuthenticated
                ? (<div>Добро пожаловать, {props.auth.email}.</div>)
                : <LoginForm {...props} />}
        </div>
    </Page>
);
