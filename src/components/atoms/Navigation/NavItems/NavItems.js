import React from "react";

import classes from "./NavItems.css";
import Item from "./Item/Item";

/**
 * @function navItems
 * @param {null} props
 * @returns {jsx} vertical aligned list navbar items
 */
const navItems = props => (
  <ul className={classes.NavItems}>
    <Item link="/" exact>
      Burger Builder
    </Item>
    <Item link="/orders">Orders</Item>
  </ul>
);

export default navItems;
