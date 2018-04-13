import React from "react";

import styles from "./InputUrl.css";

const InputUrl = props => {
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.elementType}</label>
      <input
        className={styles.InputElement}
        {...props.elementConfig}
        onChange={props.changed}
        value={props.value}
      />
    </div>
  );
};

export default InputUrl;
