import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/auth';
import AppContainer from './AppContainer';
import LoginPage from '../components/LoginPage';


const LoginPageContainer = props => (
    <AppContainer {...props} title="Авторизация" isLoading={false}>
        <LoginPage {...props} />
    </AppContainer>
);


function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(AuthActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);