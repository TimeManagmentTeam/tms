import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPageContainer from './containers/LoginPageContainer';
import ProfilePageContainer from './containers/ProfilePageContainer';
import ProfileEditPageContainer from './containers/ProfileEditPageContainer';

export default (
    <Switch>
        <Route exact path='/' component={LoginPageContainer} />
        <Route path='/profile/edit' component={ProfileEditPageContainer} />
        <Route path='/profile' component={ProfilePageContainer} />
    </Switch>
);