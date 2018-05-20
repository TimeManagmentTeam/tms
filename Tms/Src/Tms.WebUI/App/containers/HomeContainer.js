import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/auth';
import * as UserActions from '../actions/user';
import AppContainer from './AppContainer';
import LoginPage from '../components/LoginPage';
import EmployeesPage from '../components/EmployeesPage';


const HomeContainer = props => {
    let title = 'Авторизация';
    let element = <LoginPage {...props } />;
    let isLoading = false;

    if (props.auth.isAuthenticated) {
        if (('info' in props.auth.user) && props.auth.user.info.role === 0) {
            title = 'Привествие';
            element = <div className="login-form-container">Добро пожаловать, {props.auth.id}.</div>;
            isLoading = !('isInfoLoading' in props.auth.user) || props.auth.user.isInfoLoading;
        } else {
            title = 'Сотрудники';
            element = <EmployeesPage {...props} />;
            isLoading = !('isInfoLoading' in props.auth.user) || props.auth.user.isInfoLoading;
        }
    }

    return (
        <AppContainer {...props} title={title} isLoading={isLoading}>
            {element}
        </AppContainer>
    );
};


function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(AuthActions, dispatch),
        userActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);