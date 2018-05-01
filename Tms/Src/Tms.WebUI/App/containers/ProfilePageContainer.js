import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/auth';
import * as UserActions from '../actions/user';
import * as TSActions from '../actions/timeStamps';
import AppContainer from './AppContainer';
import ProfilePage from '../components/ProfilePage';


const ProfilePageContainer = props => (
    <AppContainer {...props} title="Профиль" isLoading={props.user.isInfoLoading || !('isInfoLoading' in props.user)}>
        <ProfilePage {...props} />
    </AppContainer>
);

function mapStateToProps(state) {
    return {
        auth: state.auth,
        user: state.user,
        ts: state.ts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(AuthActions, dispatch),
        userActions: bindActionCreators(UserActions, dispatch),
        tsActions: bindActionCreators(TSActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);