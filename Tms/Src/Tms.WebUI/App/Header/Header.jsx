import React from 'react';
import './Header.css';


export default class Header extends React.Component {
    render() {
        return (<header className="header">
            <div className="logo">
                <img className="logo__image" src="images/logo.jpg" />
                <span className="logo__title">Учёт времени</span>
            </div>
        </header>);
    }
}