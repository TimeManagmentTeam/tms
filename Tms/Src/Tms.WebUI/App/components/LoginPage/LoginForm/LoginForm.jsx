import React from 'react';
import Spinner from 'react-spinkit';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './LoginForm.css';
import history from '../../../history';


export default class LoginForm extends React.Component {
    onLogin = e => {
        e.preventDefault();
        this.props.authActions.login({
            email: e.target.elements[0].value,
            pass: e.target.elements[1].value
        });
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.onLogin}>
                <Input type="email" className="login-form__email" placeholder="Email" required autoFocus />
                <Input type="password" className="login-form__password" placeholder="Пароль" required />
                <div className="login-form__button">
                    <Button value="Войти" />
                    {this.props.auth.waitingLogin && <Spinner name="three-bounce" className="login-form__spinner" fadeIn="none" />}
                </div>
                {this.props.auth.error && <div className="login-form__error">{this.props.auth.error.message}</div>}
            </form>
        );
    }
}