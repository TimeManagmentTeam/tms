import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/auth';
import * as UserActions from '../actions/user';
import AppContainer from './AppContainer';
import ProfilePage from '../components/ProfilePage';


class ProfilePageContainer extends React.Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.userActions.load(this.props.match.params.id);
        }
    }

    render() {
        let title = 'Профиль';
        let user = this.props.auth.user;


        if (this.props.match.params.id) {
            title = 'Информация о сотруднике';
            user = this.props.user;
        }

        return (
            <AppContainer {...this.props} title={title} isLoading={!('isInfoLoading' in user) || user.isInfoLoading}>
                <ProfilePage {...this.props} user={user} />
            </AppContainer>
        );
    }
}


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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);