import React from "react";

import classes from "./Button.css";

/**
 * @function button
 * @param {Object} props access to methods from class BurgerBuild
 * @returns {jsx} buttons used on Modal
 */
const button = props => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
