import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store/configureStore'; 
import history from './history';

const store = configureStore();

let App = () => (
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('content')
);