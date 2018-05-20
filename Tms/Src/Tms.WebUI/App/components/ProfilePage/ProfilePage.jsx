import React from 'react';
import UserInfo from './UserInfo';
import WorkCalendar from './WorkCalendar';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import './ProfilePage.css';


export default props => {
    return (
        <div className="profile-container">
            <div>
                <UserInfo info={props.user.info} />
                <Link to={`${props.location.pathname}/edit`}><Button value="Редактировать" /></Link>
            </div>
            {props.user.info.role === 0 && <WorkCalendar {...props} />}
        </div>
    );
}