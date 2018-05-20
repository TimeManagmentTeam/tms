import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


export default class Header extends React.Component {
    state = {
        showMenu: false
    };

    onClickMenu = () => {
        this.setState((prevState, props) => {
            return { showMenu: !prevState.showMenu };
        });
    }

    render() {
        let info;
        if (this.props.auth.isAuthenticated) {
            info = this.props.auth.user.info;
        }

        return (
            <header className="header">
                <div className="header__top">
                    <div className="logo">
                        <Link to="/"><img className="logo__image" src="/images/logo.jpg" /></Link>
                        <span className="logo__title">Учёт времени</span>
                    </div>
                    {
                        this.props.auth.isAuthenticated ?
                            <div className="header__user">
                                <div className="header__user-name">
                                    <span>{info && (`${info.lastName} ${info.firstName}`)}</span>
                                    {this.props.auth.isAuthenticated && <span className="material-icons header__user-name-button" onClick={this.onClickMenu}>
                                        {this.state.showMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                                    </span>}
                                </div>
                                {this.state.showMenu &&
                                    <div className="header__user-menu" >
                                        <div className="header__user-menu-item"><Link to="/profile">Профиль</Link></div>
                                        <div className="header__user-menu-item" onClick={this.props.authActions.logout}>Выйти</div>
                                    </div>}
                            </div>
                            :
                            <div className="header__user">
                                <div className="header__user-name">
                                    <span>Привет, Гость</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="header__bottom">
                    <span className="header__title">{this.props.title}</span>
                </div>
            </header>
        );
    }
}