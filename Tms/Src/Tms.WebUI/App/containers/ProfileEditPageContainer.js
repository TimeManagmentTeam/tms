import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import AppContainer from './AppContainer';
import ProfileEditPage from '../components/ProfileEditPage';

const ProfileEditPageContainer = props => (
    <AppContainer {...props} title="Редактирование профиля" isLoading={props.user.isInfoLoading || !('isInfoLoading' in props.user)}>
        <ProfileEditPage {...props} />
    </AppContainer>
);

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPageContainer);