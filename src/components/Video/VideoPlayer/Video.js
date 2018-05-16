import React, { Component } from "react";
import { connect } from "react-redux";

import Screen from "./Screen/VideoScreen/VideoScreen";
import styles from "./Video.css";
import VidInputControls from "./Controls/VidInputCont/VidInputCont";
import Iframe from "./Screen/Iframe/Iframe";
<<<<<<< HEAD
<<<<<<< HEAD
import {} from "./socketIOUtils";
import ActClass from "../../../store/actions/iframeClass";
=======
>>>>>>> parent of c6ed91b... before class Iframe implemented
=======
>>>>>>> parent of c6ed91b... before class Iframe implemented
import * as actions from "../../../store/actions/index";
import { validateVidUrl } from "./helperUtil";

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
    fetchable: false
  };

  fetchMediaHandler = event => {
    event.preventDefault();
    this.props.onError(null);
    try {
      const urlState = validateVidUrl(this.state.input.value);
      if (urlState) {
        this.props.getScreenType(urlState.screenState);
        this.props.getMedia(urlState.url, urlState.id);
        if (!this.props.toggle) {
          this.props.onToggle();
        }
      }
    } catch (err) {
      this.props.onError(err.message);

      console.log(err.message);
    }
  };

  playVideoHandler = () => {};

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
    console.log(updateInput.value + updateFetchable.fetchable);
  };

  render() {
    let vidScreen = this.props.screenType ? (
      <Screen
        imgpost={this.props.poster}
        incontrols={true}
        source={this.props.source}
      />
    ) : (
      <Iframe />
    );

    let mediaPlayer = this.props.toggle ? (
      <div className={styles.Screen}>{vidScreen}</div>
    ) : null;

    let onErrorMsg = this.props.errorMsg ? (
      <p className={styles.Screen}>{this.props.errorMsg}</p>
    ) : (
      mediaPlayer
    );

    return (
      <div className={styles.Player}>
        {onErrorMsg}
        <VidInputControls
          input={this.state.input}
          passchange={event => this.inputChangedHandler(event)}
          togglescreen={this.props.onToggle}
          readyfetch={this.state.fetchable}
          fetchmedia={this.fetchMediaHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    source: state.vid.source,
    toggle: state.vid.open,
    errorMsg: state.vid.error,
    screenType: state.vid.isScreen,
    play: state.vid.play
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggle: () => dispatch(actions.toggleScreen()),
    getScreenType: screen => dispatch(actions.getScreenType(screen)),
    getMedia: (source, id) => dispatch(actions.getMedia(source, id)),
<<<<<<< HEAD
<<<<<<< HEAD
    onError: err => dispatch(actions.onError(err)),
    playYT: player => dispatch(ActClass.playYT())
=======
    onError: err => dispatch(actions.onError(err))
>>>>>>> parent of c6ed91b... before class Iframe implemented
=======
    onError: err => dispatch(actions.onError(err))
>>>>>>> parent of c6ed91b... before class Iframe implemented
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
