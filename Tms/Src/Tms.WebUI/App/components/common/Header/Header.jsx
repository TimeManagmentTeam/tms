import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


export default class Header extends React.Component {
    state = {
        showMenu: false,
        location: null
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.auth.isAuthenticated && nextProps.location !== prevState.location) {
            nextProps.userActions.load(nextProps.auth.id);
            return {
                location: nextProps.location
            };
        }

        return null;
    }

    onClickMenu = () => {
        this.setState((prevState, props) => {
            return { showMenu: !prevState.showMenu };
        });
    }

    render() {
        let userName = 'Привет, Гость';
        let userMenu = (
            <div className="header__user-menu" >
                <div className="header__user-menu-item"><Link to="/">Войти</Link></div>
            </div>
        );

        if (this.props.auth.isAuthenticated) {
            userName = this.props.user.info && (`${this.props.user.info.lastName} ${this.props.user.info.firstName}`);
            userMenu = (
                <div className="header__user-menu" >
                    <div className="header__user-menu-item"><Link to="/profile">Профиль</Link></div>
                    <div className="header__user-menu-item" onClick={this.props.authActions.logout}>Выйти</div>
                </div>
            );
        }

        return (<header className="header">
            <div className="header__top">
                <div className="logo">
                    <Link to="/"><img className="logo__image" src="/images/logo.jpg" /></Link>
                    <span className="logo__title">Учёт времени</span>
                </div>
                <div className="header__user">
                    <div className="header__user-name">
                        <span>{userName}</span>
                        <span className="material-icons header__user-name-button" onClick={this.onClickMenu}>
                            {this.state.showMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                        </span>
                    </div>
                    {this.state.showMenu && userMenu}
                </div>
            </div>
            <div className="header__bottom">
                <span className="header__title">{this.props.title}</span>
            </div>
        </header>);
    }
}