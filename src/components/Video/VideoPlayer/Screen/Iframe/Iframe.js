import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../../store/actions/index";
import styles from "./Iframe.css";
import { destroyIframeYT } from "./util";

class Iframe extends Component {
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
          if (timeDiff < 10) {
            if (timeDiff > -10) {
              console.log("[noDiff]");
              this.player.playVideo();
              break;
            } else {
              console.log("[Diff]");
              this.player.seekTo(nextProps.socketPlace, true);
              this.player.playVideo();
              break;
            }
          } else {
            console.log("[Diff]");
            this.player.seekTo(nextProps.socketPlace, true);
            this.player.playVideo();
            break;
          }
        case 2:
          playTime = this.player.getCurrentTime();
          timeDiff = nextProps.socketPlace - playTime;
          if (timeDiff < 10) {
            if (timeDiff > -10) {
              console.log("[noDiff]");
              this.player.pauseVideo();
              break;
            } else {
              console.log("[Diff]");
              this.player.seekTo(nextProps.socketPlace, true);
              this.player.pauseVideo();
              break;
            }
          } else {
            console.log("[Diff]");
            this.player.seekTo(nextProps.socketPlace, true);
            this.player.pauseVideo();
            break;
          }
        case 0:
          break;
        default:
          break;
      }
    }
    // TODO
    if (
      nextProps.videoId !== this.props.videoId &&
      this.props.videoId !== null
    ) {
      if (this.player) {
        this.player.loadVideoById(nextProps.videoId);
        console.dir(this.player);
      } else {
        this.props.createYT(nextProps.videoId).then(player => {
          this.player = player;
        });
      }
    }
  }

  componentWillUnmount() {
    destroyIframeYT();
  }

  render() {
    return (
      <div id="outPlayer">
        <div id="inPlayer">
          <div id="player" className={styles.Screen} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    videoId: state.vid.videoId,
    socketControlId: state.vid.socketMaster,
    socketState: state.vid.socketState,
    socketPlay: state.vid.socketPlay,
    ytErrCode: state.iframe.ytErrCode,
    socketPlace: state.vid.socketPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createYT: (videoId, controls) =>
      dispatch(actions.createYT(videoId, controls))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Iframe);
