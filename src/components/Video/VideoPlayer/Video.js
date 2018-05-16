import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

import Screen from "./Screen/VideoScreen/VideoScreen";
import styles from "./Video.css";
import VidInputControls from "./Controls/VidInputCont/VidInputCont";
import Iframe from "./Screen/Iframe/Iframe";
import {} from "./socketIOUtils";
import * as actions from "../../../store/actions/index";
import { validateVidUrl } from "./helperUtil";

class Video extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
  }

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

  componentWillMount() {
    console.log("[compWillMount]");
    this.socket = io.connect("http://localhost:3000", {
      transports: ["websocket"]
    });
    this.socket.on("reconnect_attempt", () => {
      console.log("[in reconnect]");
      console.dir(this.socket.io);
      this.socket.io.opts.transports = ["polling", "websocket"];
    });

    this.socket.on("upDateVideo", recObj => {
      console.log("[in upDateVideo]");
      this.getScreenType(recObj.screenState);
      this.getMedia(recObj.url, recObj.id);
      if (!this.toggle) {
        this.onToggle();
      }
    });

    this.socket.on("allIsReady", recObj => {
      console.log("[in allIsReady]");
    });

    console.dir(this.socket);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.isReady !== this.props.isReady) {
      console.log("[cWU]" + nextProps.isReady);
      this.socket.emit("isReady", { id: this.socket.id });
    } else if (nextProps.videoId !== this.props.videoId) {
      console.log("[cWU]" + nextProps.videoId);
    } else if (nextProps.quality !== this.props.quality) {
      // set socket for quality
      console.log("[cWU]" + nextProps.quality);
    } else if (nextProps.rate !== this.props.rate) {
      // set socket for rate
      console.log("[cWU]" + nextProps.rate);
    } else if (nextProps.stateNum !== this.props.stateNum) {
      // -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buf, 5 video cued
      console.log("[cWU]" + nextProps.stateNum);
      switch (nextProps.stateNum) {
        case -1:
          return;
        case 0:
          return;
        case 1:
          return;
        case 2:
          return;
        case 3:
          return;
        case 5:
          return;
        default:
          break;
      }
    } else {
      return;
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

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
      // to pass videoId, videoURL, screenState
      this.socket.emit("newVideo", {
        url: urlState.url,
        id: urlState.id,
        screenState: urlState.screenState
      });
    } catch (err) {
      this.props.onError(err.message);

      console.log(err.message);
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
    console.log(updateInput.value + updateFetchable.fetchable);
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
    isReady: state.iframe.isReady,
    stateNum: state.iframe.stateNum,
    quality: state.iframe.quality,
    rate: state.iframe.rate,
    errCode: state.iframe.errCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggle: () => dispatch(actions.toggleScreen()),
    getScreenType: screen => dispatch(actions.getScreenType(screen)),
    getMedia: (source, id) => dispatch(actions.getMedia(source, id)),
    onError: err => dispatch(actions.onError(err)),
    playYT: player => dispatch(actions.playYT(window.YT.Player))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
