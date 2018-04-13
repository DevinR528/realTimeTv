import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

/**
* @class Layout 
* @prop {Object} state showSideDrawer 
* @returns {jsx} layout of components for App
*/
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler= ()=>{
        this.setState({showSideDrawer: false});
    }

    SideDrawerToggleHandler = () => {
        this.setState((prevState)=> {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.SideDrawerClosedHandler} />
                <main 
                    className={classes.Content} >{this.props.children}
                </main>
            </Aux>
        );
    };
};

export default Layout;