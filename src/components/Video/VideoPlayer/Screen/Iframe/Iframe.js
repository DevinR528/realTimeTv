import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../../store/actions/index";
import ErrorBoundary from "../../../../atoms/hoc/withErrorHandler/withErrorHandler";
import styles from "./Iframe.css";

class Iframe extends Component {
  componentWillMount() {}

  componentDidMount() {
    const controlPlayer =
      this.props.mySocketId === this.props.socketControlId ? 1 : 0;
    this.props.createYT(this.props.videoId, controlPlayer).then(player => {
      this.player = player;
      console.dir(this.player);
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    // sync's duration
    if (nextProps.socketPlace !== this.props.socketPlace) {
      console.log("[cWU]" + nextProps.socketPlace);
      this.player.seekTo(nextProps.socketPlace);
      // sync's rate
    } else if (nextProps.socketYTError !== this.props.socketYTError) {
      console.log("[cWU]" + nextProps.socketYTError);
      // -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buf, 5 video cued
    } else if (nextProps.socketState !== this.props.socketState) {
      console.log("[cWU]" + nextProps.socketState);
      switch (nextProps.socketState) {
        case -1:
          if (nextProps.socketPlay === true) {
            this.player.playVideo();
          }
          return;
        case 0:
          return;
        case 1:
          this.player.playVideo();
          return;
        case 2:
          this.player.pauseVideo();
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
    const yt = document.getElementById("inPlayer");
    const replaceDiv = document.createElement("div");
    replaceDiv.id = "player";
    const parent = document.getElementById("outPlayer");
    parent.replaceChild(replaceDiv, yt);
  }

  render() {
    return (
      <div id="outPlayer">
        <div id="inPlayer">
          <ErrorBoundary>
            <div id="player" className={styles.Screen} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    videoId: state.vid.videoId,
    socketControlId: state.vid.socketMaster,
    mySocketId: state.vid.mySocketId,
    socketState: state.vid.socketState,
    socketQuality: state.vid.socketQuality,
    socketRate: state.vid.socketRate,
    socketYTError: state.vid.socketYTError,
    socketPlay: state.vid.socketPlay,
    socketPlace: state.vid.socketPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createYT: (videoId, controls) =>
      dispatch(actions.createYT(videoId, controls))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Iframe);
