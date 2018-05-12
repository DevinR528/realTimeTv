import React from "react";

import PlayBtn from "./Play/PlayBtn";
import styles from "./Controls.css";

const Controls = props => {
  let playOrPause = props.pauseable ? "PLAY" : "PAUSE";

  return (
    <div className={styles.Controls}>
      <PlayBtn
        btnType={props.pauseable ? "Success" : "Danger"}
        paused={props.pauseable}
        clicked={props.playing}
      >
        {playOrPause}
      </PlayBtn>
    </div>
  );
};

export default Controls;
