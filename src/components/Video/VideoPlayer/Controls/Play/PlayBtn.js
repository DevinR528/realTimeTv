import React from "react";

import styles from "./PlayBtn.css";

/**
 * @function playBtn
 * @param {Object} props access to methods from class BurgerBuild
 * @returns {jsx} buttons used on Modal
 */
const playBtn = props => (
  <button
    className={[styles.Button, styles[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default playBtn;
