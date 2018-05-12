import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Screen.css";

class VideoScreen extends Component {
  render() {
    return (
      <video
        className={styles.Screen}
        controls={this.props.incontrols}
        src={this.props.source}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    source: state.vid.source,
    play: state.vid.play
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
