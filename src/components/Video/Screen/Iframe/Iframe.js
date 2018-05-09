import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../store/actions/index";
import styles from "./Iframe.css";

const apiKey = "AIzaSyCANZcow3KNgr_oI09HLDBTdHqpVsFVKU4";

class Iframe extends Component {
  componentDidMount() {
    var URL = `https://www.googleapis.com/youtube/v3/videos?id=${
      this.props.videoId
    }&key=${apiKey}&part=snippet,contentDetails,statistics,status,fileDetails,liveStreamingDetails`;

    fetch(URL)
      .then(res => {
        var resJson = res.json();
        console.log(resJson);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <iframe
        id="player"
        className={styles.Screen}
        title={this.props.title}
        src={this.props.source}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    videoId: state.vid.videoId,
    source: state.vid.source,
    title: state.vid.source,
    play: state.vid.play
  };
};

const mapDispatchToProps = dispatch => {
  return {
    syncPlay: () => dispatch(actions.syncMedia())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Iframe);
