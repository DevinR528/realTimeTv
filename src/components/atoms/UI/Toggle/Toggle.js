import React from "react";
import ToggleButton from "react-toggle-button";

import styles from "./Toggle.css";

/**
 * @function toggle
 * @param {Object} props
 * @returns {jsx} a toggle switch with props.label as title?
 */
const toggle = props => (
  <label className={styles.label}>
    <span>{props.children}</span>
    <ToggleButton
      value={props.default}
      onToggle={props.clicked}
      inactiveLabel={""}
      activeLabel={"ON"}
      colors={{
        activeThumb: {
          base: "rgb(250,250,250)"
        },
        inactiveThumb: {
          base: "rgb(62,130,247)"
        },
        active: {
          base: "rgb(207,221,245)",
          hover: "rgb(177, 191, 215)"
        },
        inactive: {
          base: "rgb(65,66,68)",
          hover: "rgb(95,96,98)"
        }
      }}
    />
  </label>
);

export default toggle;
// 'activeLabel' - a string or component to display when ON.
