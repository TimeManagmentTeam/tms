import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import ProfilePageContainer from './containers/ProfilePageContainer';
import ProfileEditPageContainer from './containers/ProfileEditPageContainer';

export default (
    <Switch>
        <Route exact path='/' component={HomeContainer} />
        <Route path='/profile/edit' component={ProfileEditPageContainer} />
        <Route path='/profile' component={ProfilePageContainer} />
        <Route path='/user/:id/edit' component={ProfileEditPageContainer} />
        <Route path='/user/:id' component={ProfilePageContainer} />
    </Switch>
);