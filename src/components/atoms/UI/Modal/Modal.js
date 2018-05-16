import React, {Component}from 'react';

import classes from './Modal.css';
import Aux from "../../../hoc/Aux";
import Backdrop from '../Backdrop/Backdrop';

/**
* @class Modal 
* @param {Boolean} props BurgerBuilder sets props show/hide 
* @returns {jsx} burger with logic for buildControl to add ingredients
*/

// if made class component and shouldcomponentUpdate if (nextProps.show 
// !==this.props.show) return true and shouldCompUpdate will run otherwise 
// everytime the BurgerBuilder button is pushed rerender occurs
class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate () {
        console.log('[Modal] WillUpdate');
    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;