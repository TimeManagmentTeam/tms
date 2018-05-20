import React from 'react';
import './Button.css';


export default props => (
    <button {...props} className={props.className ? `input ${props.className}` : "button"}>{props.value}</button>
);
