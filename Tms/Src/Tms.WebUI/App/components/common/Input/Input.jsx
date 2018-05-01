import React from 'react';
import './Input.css';


export default props => (
    <input {...props} className={props.className ? `input ${props.className}` : "input"} />
);
