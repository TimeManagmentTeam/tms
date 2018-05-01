import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/common/Layout';
import * as AuthActions from '../actions/auth';
import * as UserActions from '../actions/user';


function mapStateToProps(state) {
    return {
        auth: state.auth,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(AuthActions, dispatch),
        userActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);