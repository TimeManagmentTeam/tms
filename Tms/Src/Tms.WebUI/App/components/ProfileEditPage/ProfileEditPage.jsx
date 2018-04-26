import React from 'react';
import Page from '../common/Page';
import UserEditForm from './UserEditForm';
import Spinner from 'react-spinkit';
import './ProfileEditPage.css';


export default class ProfilePage extends React.Component {
    componentWillMount() {
        this.props.userActions.loadUserInfo(this.props.auth.email);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.location !== this.props.location) {
            this.props.userActions.loadUserInfo(nextProps.auth.email);
        }
    }
    
    render() {
        return (
            <Page title="Редактирование профиля" {...this.props} >
                {!this.props.user.isLoading && <div className="profile-edit-container">
                    <UserEditForm {...this.props} />
                </div>}
            </Page>
        );
    }
}