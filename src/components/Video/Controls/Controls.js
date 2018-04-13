import React from "react";

import PlayBtn from "./Play/PlayBtn";
import Slider from "./Slider/Slider";
import Skip from "./Skip/Skip";
import styles from "./Controls.css";

const Controls = props => {
  let playOrPause = props.pauseable ? "PLAY" : "PAUSE";

  return (
    <div className={styles.Controls}>
      <PlayBtn paused={props.pauseable} clicked={props.playing}>
        {playOrPause}
      </PlayBtn>
      <Slider />
      <Skip />
    </div>
  );
};

export default Controls;
