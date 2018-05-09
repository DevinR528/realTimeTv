import React from "react";

import styles from "./InputUrl.css";

const InputUrl = props => {
  return (
    <input
      className={styles.InputElement}
      {...props.elementConfig}
      onChange={props.changed}
      value={props.value}
    />
  );
};

export default InputUrl;
