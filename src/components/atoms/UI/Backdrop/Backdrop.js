import React from 'react';

import classes from './Backdrop.css';

/**
* @function backdrop 
* @param {Boolean} props handler for show/hide  
* @returns {jsx} covers page when modal displays and sideDrawer
*/
const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;
