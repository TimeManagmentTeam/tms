import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


export default class Header extends React.Component {
    onLogout = () => {
        this.props.authActions.logout();
    }

    render() {
        return (<header className="header">
            <div className="header__top">
                <div className="logo">
                    <Link to="/"><img className="logo__image" src="/images/logo.jpg" /></Link>
                    <span className="logo__title">Учёт времени</span>
                </div>
                <div className="welcome">
                    Привет, {this.props.auth.isAuthenticated ? this.props.auth.email : 'Гость'}.
                    {this.props.auth.isAuthenticated && <div className="logout" onClick={this.onLogout}>Выйти</div>}
                    {this.props.auth.isAuthenticated && <Link to="/profile">Профиль</Link>}
                </div>
            </div>
            <div className="header__bottom">
                <span className="header__title">{this.props.title}</span>
            </div>
        </header>);
    }
}