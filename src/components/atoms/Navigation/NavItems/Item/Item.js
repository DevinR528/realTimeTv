import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Item.css";

/**
 * @function item
 * @param {Object} props link String and active Boolean
 * @returns {jsx} items on the NavItem navbar
 */
const item = props => (
  <li className={classes.Item}>
    <NavLink
      activeClassName={classes.active}
      exact={props.exact}
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
);

export default item;
