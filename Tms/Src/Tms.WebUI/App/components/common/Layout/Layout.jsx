import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Spinner from 'react-spinkit';
import { Redirect } from 'react-router-dom';
import './Layout.css';


let Loading = props => (
    <div className="loading">
        <Spinner name="three-bounce" className="loading__spinner" fadeIn="none" />
    </div>
);


export default props => {
    if (!props.auth.isAuthenticated && props.location.pathname !== '/') {
        return <Redirect to="/" />;
    }

    return (
        <div className="wrapper">
            <Header {...props} />
            <main className="content">
                {props.isLoading ? <Loading /> : props.children}
            </main>
            <Footer />
        </div>
    );
};