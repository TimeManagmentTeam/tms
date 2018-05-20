import React from 'react';
import UserEditForm from './UserEditForm';
import './ProfileEditPage.css';


export default props => (
    <div className="profile-edit-container">
        <UserEditForm {...props} />
    </div>
);