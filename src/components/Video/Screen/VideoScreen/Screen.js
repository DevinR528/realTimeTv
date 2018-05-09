import React from "react";

import styles from "./Screen.css";

const Screen = props => {
  return (
    <video
      className={styles.Screen}
      poster={props.imgpost}
      controls={props.incontrols}
      src={props.source}
    />
  );
};

export default Screen;
