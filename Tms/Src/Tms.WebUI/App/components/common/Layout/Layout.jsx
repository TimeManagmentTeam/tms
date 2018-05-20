import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Spinner from 'react-spinkit';
import { Redirect } from 'react-router-dom';
import './Layout.css';


export default class Layout extends React.Component {
    state = {
        location: null
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.auth.isAuthenticated && nextProps.location !== prevState.location) {
            nextProps.userActions.load(nextProps.auth.id);
            return {
                location: nextProps.location
            };
        }

        return null;
    }

    renderLoading() {
        return (
            <div className="loading">
                <Spinner name="three-bounce" className="loading__spinner" fadeIn="none" />
            </div>
        );
    }

    render() {
        if (!this.props.auth.isAuthenticated && this.props.location.pathname !== '/') {
            return <Redirect to="/" />;
        }

        return (
            <div className="wrapper">
                <Header {...this.props} />
                <main className="content">
                    {this.props.isLoading ? this.renderLoading() : this.props.children}
                </main>
                <Footer />
            </div>
        );
    }
}