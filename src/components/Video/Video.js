import React, { Component } from "react";

import Controls from "./Controls/Controls";
import Screen from "./Screen/Screen";
import styles from "./Video.css";
import VidInputControls from "./Controls/VidInputCont/VidInputCont";

class Video extends Component {
  state = {
    input: {
      eleType: "input",
      eleConfig: {
        type: "url",
        placeholder: "URL of video"
      },
      value: "",
      loading: false
    },
    video: {
      paused: true,
      place: 0
    },
    open: false,
    fetchable: false
  };

  togglePlayerHandler = () => {
    const updatedOpenState = {
      ...this.state
    };
    updatedOpenState.open = !updatedOpenState.open;
    this.setState({ open: updatedOpenState });
    console.log(this.state.open);
  };

  fetchMediaHandler = event => {
    event.preventDefault();
  };

  playVideoHandler = () => {
    const updatePause = {
      ...this.state.video
    };
    updatePause.paused = !updatePause.paused;
    // if playing
    if (!updatePause.paused) {
      console.log("i'm playing");
    }
    this.setState({ video: updatePause });
  };

  inputChangedHandler = event => {
    const updateInput = {
      ...this.state.input
    };
    const updateFetchable = {
      ...this.state
    };
    updateFetchable.fetchable = true;
    updateInput.value = event.target.value;
    this.setState({ input: updateInput, fetchable: updateFetchable });
    console.log(`state: ${this.state}  other: ${updateInput}`);
  };

  render() {
    const mediaPlayer = this.state.open ? (
      <div className={styles.Screen}>
        <Screen />
        <Controls
          className={styles.Controls}
          playing={this.playVideoHandler}
          pauseable={this.state.video.paused}
        />
      </div>
    ) : null;

    return (
      <div className={styles.Player}>
        {mediaPlayer}
        <VidInputControls
          className={styles.VideoInput}
          input={this.state.input}
          passchange={event => this.inputChangedHandler(event)}
          togglescreen={this.togglePlayerHandler}
          readyfetch={this.state.fetchable}
          fetchmedia={this.fetchMediaHandler}
        />
      </div>
    );
  }
}

export default Video;
