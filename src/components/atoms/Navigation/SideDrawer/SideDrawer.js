import React from 'react';


import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
import classes from './SideDrawer.css';
/**
* @function sideDrawer 
* @param {Object} props   
* @returns {jsx} 
*/
const sideDrawer= (props)=>{
    let attachedClasses = [classes.SideDrawer, classes.Close,];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop 
                show={props.open} 
                clicked={props.closed} />
            <div className={attachedClasses.join(' ')} >
                <div className={classes.Logo} >
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Aux>
    )
};

export default sideDrawer;