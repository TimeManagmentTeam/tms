import React from 'react';
import Page from '../common/Page';
import UserInfo from './UserInfo';
import WorkCalendar from './WorkCalendar';
import Spinner from 'react-spinkit';
import './ProfilePage.css';


export default class ProfilePage extends React.Component {
    componentWillMount() {
        this.props.userActions.loadUserInfo(this.props.auth.email);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log(this.props);

        if (nextProps.location !== this.props.location || !('info' in this.props.user)) {
            this.props.userActions.loadUserInfo(nextProps.auth.email);
        }
    }
    
    render() {
        return (
            <Page title="Профиль" {...this.props} >
                {!this.props.user.isLoading && <div className="profile-container">
                    <UserInfo {...this.props} />
                    <WorkCalendar {...this.props} />
                </div>}
            </Page>
        );
    }
}