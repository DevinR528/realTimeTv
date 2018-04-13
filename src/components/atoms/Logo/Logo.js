import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

/**
* @function logo 
* @param {Object} props  
* @returns {jsx} dynamic webpacked image 
*/
const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt='MyBurger' />
    </div>
);

export default logo;