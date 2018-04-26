import React from 'react';
import Button from '../../common/Button';
import { Link } from 'react-router-dom';
import './UserInfo.css';


export default props => (
    <div className="user-info">
        <div className="user-info__row">
            <span className="user-info__label">Фамилия</span>
            <span className="user-info__labeled">{props.user.info.lastName}</span>
        </div>
        <div className="user-info__row">
            <span className="user-info__label">Имя</span>
            <span className="user-info__labeled">{props.user.info.firstName}</span>
        </div>
        <div className="user-info__row">
            <span className="user-info__label">Отчество</span>
            <span className="user-info__labeled">{props.user.info.middleName}</span>
        </div>
        <div className="user-info__row">
            <span className="user-info__label">Почта</span>
            <span className="user-info__labeled">{props.user.info.email}</span>
        </div>
        <div className="user-info__separator"></div>
        <div className="user-info__row">
            <span className="user-info__label">Руководитель</span>
            <span className="user-info__labeled">{props.user.info.director}</span>
        </div>
        <div className="user-info__row">
            <span className="user-info__label">Гл. Руководитель</span>
            <span className="user-info__labeled">{props.user.info.departmentDirector}</span>
        </div>
        <Link to="/profile/edit"><Button value="Редактировать" /></Link>
    </div>
);