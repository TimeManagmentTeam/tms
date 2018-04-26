import React from 'react';
import Header from './../Header';
import Footer from './../Footer';
import './Page.css';


export default props => (
    <div className="wrapper">
        <Header {...props} />
        <main className="content">
            {props.children}
        </main>
        <Footer />
    </div>
);