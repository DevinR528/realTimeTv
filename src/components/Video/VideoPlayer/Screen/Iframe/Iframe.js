import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../../store/actions/index";
import styles from "./Iframe.css";

class Iframe extends Component {
  //TODO test to make sure async await didnt do anything
  componentDidMount() {
    this.props.createYT(this.props.videoId);
  }

  render() {
    return <div id="player" className={styles.Screen} />;
  }
}

const mapStateToProps = state => {
  return {
    videoId: state.vid.videoId,
    source: state.vid.source,
    play: state.vid.play,
    isReady: state.iframe.isReady,
    stateNum: state.iframe.stateNum
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createYT: videoId => dispatch(actions.createYT(videoId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Iframe);
