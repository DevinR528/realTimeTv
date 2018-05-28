import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../../store/actions/index";
import ErrorBoundary from "../../../../atoms/hoc/withErrorHandler/withErrorHandler";
import styles from "./Iframe.css";

class Iframe extends Component {
  componentWillMount() {}

  componentDidMount() {
    this.props.createYT(this.props.videoId).then(player => {
      this.player = player;
      console.dir(this.player);
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    // sync's duration on play, and pauses when synced
    if (nextProps.socketState !== this.props.socketState) {
      console.log("[cWU]" + nextProps.socketState);
      let playTime, timeDiff;
      switch (nextProps.socketState) {
        case 1:
          playTime = this.player.getCurrentTime();
          timeDiff = nextProps.socketPlace - playTime;
          console.log(`${nextProps.socketPlace}-${playTime}=${timeDiff}`);
          if (-15 < timeDiff < 15) {
            this.player.playVideo();
            break;
          } else {
            this.player.seekTo(nextProps.socketPlace);
            this.player.playVideo();
            break;
          }
        case 2:
          this.player.pauseVideo();
          break;
        case 0:
          break;
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
    socketYTError: state.vid.socketYTError,
    socketPlay: state.vid.socketPlay,
    socketPlace: state.vid.socketPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createYT: videoId => dispatch(actions.createYT(videoId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Iframe);
