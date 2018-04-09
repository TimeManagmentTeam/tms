import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import Employees from './Employees/Employees.jsx';
import './index.css';


class App extends React.Component {
    render() {
        return (<div className="wrapper">
            <Header />
            <div className="content">
                <Employees />
            </div>
            <Footer />
        </div>);
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('content')
);