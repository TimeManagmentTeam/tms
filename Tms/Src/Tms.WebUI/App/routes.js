import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';
import ProfileEditPage from './containers/ProfileEditPage';

export default (
    <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route path='/profile/edit' component={ProfileEditPage} />
        <Route path='/profile' component={ProfilePage} />
    </Switch>
);