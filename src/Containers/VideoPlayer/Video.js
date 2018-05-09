import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import Screen from "../../components/Video/Screen/VideoScreen/Screen";
import styles from "./Video.css";
import VidInputControls from "../../components/Video/Controls/VidInputCont/VidInputCont";
import Iframe from "../../components/Video/Screen/Iframe/Iframe";
import * as actions from "../../store/actions/index";

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

  togglePlayerHandler = () => {
    this.props.onToggle();
  };

  fetchMediaHandler = event => {
    event.preventDefault();
    //TODO parse input value to se if iFrame or player will work
    // if .mp4 then player if .youtube.com
    const inputUrl = this.state.input.value;
    const urlObj = queryString.parseUrl(inputUrl);
    if (urlObj.url.includes(".youtube.com")) {
      const cutStr = urlObj.url.substr(0, 23);
      const embedStr = cutStr + "/embed/" + urlObj.query.v;
      console.log(urlObj);
      console.log(embedStr);
      this.props.getScreenType(false);
      this.props.getMedia(embedStr, urlObj.query.v);
      if (!this.props.toggle) {
        this.props.onToggle();
      }
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
    let screen = this.props.screenType ? (
      <Screen
        imgpost={this.props.poster}
        incontrols={!this.props.play}
        source={this.props.source}
      />
    ) : (
      <Iframe source={this.props.source} utitle={this.state.input.value} />
    );

    let mediaPlayer = this.props.toggle ? (
      <div className={styles.Screen}>{screen}</div>
    ) : null;

    return (
      <div className={styles.Player}>
        {mediaPlayer}
        <VidInputControls
          input={this.state.input}
          passchange={event => this.inputChangedHandler(event)}
          togglescreen={this.togglePlayerHandler}
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
    fetchable: state.vid.fetchable,
    screenType: state.vid.isScreen,
    play: state.vid.play
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggle: () => dispatch(actions.toggleScreen()),
    getScreenType: screen => dispatch(actions.getScreenType(screen)),
    getMedia: (source, id) => dispatch(actions.getMedia(source, id)),
    syncPlay: () => dispatch(actions.syncMedia())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
