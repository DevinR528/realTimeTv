import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

import Screen from "./Screen/VideoScreen/VideoScreen";
import styles from "./Video.css";
import VidInputControls from "./Controls/VidInputCont/VidInputCont";
import Iframe from "./Screen/Iframe/Iframe";
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
    fetchable: false,
    shouldSync: true,
    whilePlaying: false
  };

  componentWillMount() {
    console.log("[compWillMount]");
    this.socket = io.connect("http://localhost:5000", {
      transports: ["websocket"]
    });

    this.socket.on("connect", () => {});

    this.socket.on("reconnect_attempt", () => {
      console.log("[in reconnect]");
      this.socket.io.opts.transports = ["polling", "websocket"];
    });

    // sync's all video players to current video url
    this.socket.on("updateVideo", recObj => {
      console.log("[in updateVideo]");
      this.props.onToggle();
      this.props.setSocketMaster(recObj.controlId);
      this.props.getScreenType(recObj.screenState);
      this.props.getMedia(recObj.url, recObj.id);
      if (!this.props.toggle) {
        this.props.onToggle();
      }
    });

    // starts all players at the same time once ready
    this.socket.on("allIsReady", readyObj => {
      console.log("[in allIsReady]");
      if (readyObj) {
        if (readyObj.errMsg) {
          this.props.onError(readyObj.errMsg);
        } else if (readyObj.msg) {
          //TODO
          console.log(readyObj.msg);
          this.props.setSocketPlay(false);
          this.props.onError(readyObj.msg);
        }
      } else {
        this.props.setSocketPlay(true);
      }
    });

    // sync's state of video play, pause and checks for duration changes
    this.socket.on("updateState", recObj => {
      this.props.setSocketState(recObj.state);
    });

    // sync's video duration
    //TODO
    this.socket.on("updatePlace", recObj => {
      this.props.setSocketPlace(recObj.place);
    });

    //
    this.socket.on("updateDone", recObj => {
      this.props.setSocketDone(recObj.isDone);
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.isReady !== this.props.isReady) {
      this.socket.emit("isReady");
    }
    if (nextProps.ytErrCode !== this.props.ytErrCode) {
      //2 bad videoID, 5html, 100 not found, 101 and 150 owner denial
      this.props.onError(
        `The video id ${this.props.videoId} was not found. Try again!`
      );
    }
    if (nextProps.stateNum !== this.props.stateNum) {
      this.socket.emit("stateChange", {
        state: nextProps.stateNum
      });
    }
    if (nextProps.ytPlace !== this.props.ytPlace) {
      this.socket.emit("placeChange", {
        ytPlace: nextProps.ytPlace
      });
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  SetVideo = () => {
    try {
      this.props.onError(null);
      const urlState = validateVidUrl(this.state.input.value);
      if (urlState) {
        this.props.getScreenType(urlState.screenState);
        this.props.getMedia(urlState.url, urlState.id);
        if (!this.props.toggle) {
          this.props.onToggle();
        }
        // to pass videoId, videoURL, screenState
        this.socket.emit("newVideo", {
          url: urlState.url,
          vidId: urlState.id,
          screenState: urlState.screenState,
          controlId: this.socket.id
        });
      }
    } catch (err) {
      this.props.onError(err.message);

      console.log(err.message);
    }
  };

  fetchMediaHandler = event => {
    event.preventDefault();
    if (this.state.whilePlaying) {
      this.SetVideo();
    } else {
      this.SetVideo();
      this.setState(prevState => {
        return { whilePlaying: true };
      });
    }
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
  };

  toggleSyncedHandler = () => {
    this.setState(prevState => {
      return { shouldSync: !prevState.shouldSync };
    });
  };

  render() {
    let vidScreen = this.props.screenType ? (
      <Screen incontrols={true} source={this.props.source} />
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
          screenopen={this.props.toggle}
          readyfetch={this.state.fetchable}
          fetchmedia={this.fetchMediaHandler}
          shouldsync={this.state.shouldSync}
          togglesync={this.toggleSyncedHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    source: state.vid.source,
    videoId: state.vid.videoId,
    toggle: state.vid.open,
    errorMsg: state.vid.error,
    screenType: state.vid.isScreen,
    isReady: state.iframe.isReady,
    stateNum: state.iframe.stateNum,
    ytErrCode: state.iframe.ytErrCode,
    ytPlace: state.iframe.ytPlace,
    socketControlId: state.vid.socketMaster,
    mySocketId: state.vid.mySocketId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggle: () => dispatch(actions.toggleScreen()),
    getScreenType: screen => dispatch(actions.getScreenType(screen)),
    getMedia: (source, id) => dispatch(actions.getMedia(source, id)),
    onError: err => dispatch(actions.onError(err)),
    setSocketPlay: shouldPlay => dispatch(actions.setSocketPlay(shouldPlay)),
    setSocketMaster: controlId => dispatch(actions.setSocketMaster(controlId)),
    setSocketPlace: socketPlace =>
      dispatch(actions.setSocketPlace(socketPlace)),
    setSocketState: socketState => dispatch(actions.setSocketState(socketState))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
