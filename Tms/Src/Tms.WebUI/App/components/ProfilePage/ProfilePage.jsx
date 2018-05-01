import React from 'react';
import UserInfo from './UserInfo';
import WorkCalendar from './WorkCalendar';
import './ProfilePage.css';


export default props => (
    <div className="profile-container">
        <UserInfo {...props} />
        <WorkCalendar {...props} />
    </div>
);