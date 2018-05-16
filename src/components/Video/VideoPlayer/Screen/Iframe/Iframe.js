import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../../store/actions/index";
import ErrorBoundary from "../../../../atoms/hoc/withErrorHandler/withErrorHandler";
import ActClass from "../../../../../store/actions/iframeClass";
import styles from "./Iframe.css";

class Iframe extends Component {
  constructor(props) {
    super(props);
    this.Player = new ActClass();
  }
  componentWillMount() {}

  componentDidMount() {
    this.props.createYT(this.props.videoId);
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
    toggle: state.vid.open,
    videoId: state.vid.videoId,
    isReady: state.iframe.isReady,
    stateNum: state.iframe.stateNum,
    quality: state.iframe.quality,
    rate: state.iframe.rate,
    errCode: state.iframe.errCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createYT: videoId => dispatch(actions.createYT(videoId)),
    onToggle: () => dispatch(actions.toggleScreen())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Iframe);
