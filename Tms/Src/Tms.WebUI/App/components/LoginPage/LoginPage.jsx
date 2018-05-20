import React from 'react';
import LoginForm from './LoginForm';
import './LoginPage.css';


export default props => (
    <div className="login-form-container">
        <LoginForm {...props} />
    </div>
);
