import React from 'react';
import './UserInfo.css';


export default ({ info }) => (
    <div className="user-info">
        <div className="user-info__row">
            <span className="user-info__label">Фамилия</span>
            <span className="user-info__labeled">{info.lastName}</span>
        </div>
        <div className="user-info__row">
            <span className="user-info__label">Имя</span>
            <span className="user-info__labeled">{info.firstName}</span>
        </div>
        <div className="user-info__row">
            <span className="user-info__label">Отчество</span>
            <span className="user-info__labeled">{info.middleName}</span>
        </div>
        <div className="user-info__row">
            <span className="user-info__label">Почта</span>
            <span className="user-info__labeled">{info.email}</span>
        </div>
        {info.role !== 2 && <div>
            <div className="user-info__separator"></div>
            <div className="user-info__row">
                <span className="user-info__label">Руководитель</span>
                <span className="user-info__labeled">{info.director.lastName} {info.director.firstName} {info.director.middleName}</span>
            </div>
            <div className="user-info__row">
                <span className="user-info__label">Гл. Руководитель</span>
                <span className="user-info__labeled">{info.departmentDirector.lastName} {info.departmentDirector.firstName} {info.departmentDirector.middleName}</span>
            </div>
        </div>}
    </div>
);