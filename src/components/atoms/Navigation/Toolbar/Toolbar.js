import React from 'react';

import NavItems from '../NavItems/NavItems';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.css';

/**
* @function toolbar 
* @param {Object} props   
* @returns {jsx} vertical aligned fixed to top set in Layout
*/
const toolbar= (props)=>(
    <header className={classes.Toolbar} >
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo} >
            <Logo />
        </div>
        <nav className={classes.DesktopOnly} >
            <NavItems />
        </nav>
    </header>
);

export default toolbar;