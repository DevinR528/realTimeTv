import * as actionTypes from "./actionTypes";
import { loadSdk, eventNames } from "../utility";

class IframeAction {
  constructor(props) {
    this.props = props;
  }

  createYT = videoId => {
    return dispatch => {
      loadSdk()
        .then(YT => {
          return new Promise(res => {
            this.resPlayer = res;
            const player = new YT.Player("player", {
              height: "200",
              width: "369",
              videoId: `${videoId}`,
              events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
              }
            });
            function onPlayerReady(event) {
              dispatch(this.onReady(true));
              event.target.playVideo();
            }
            function onPlayerStateChange(event) {
              console.log(event);
              dispatch(this.onStateChange(event.data));
            }

            Object.keys(eventNames).forEach(ytName => {
              const ytFiredEvents = eventNames[ytName];
              console.log(ytFiredEvents);
              player.addEventListener(ytName, e => {
                if (this[ytFiredEvents]) {
                  this[ytFiredEvents](e);
                }
              });
            });
          });
        })
        // TODO
        .catch(err => {
          console.log(err);
        });
    };
  };

  onReady = isReady => {
    return {
      type: actionTypes.ON_READY,
      isReady: isReady
    };
  };

  onStateChange = stateNum => {
    return {
      type: actionTypes.ON_STATE_CHANGE,
      stateNum: stateNum
    };
  };

  getControlPlayer = vidSrc => {
    return {};
  };
}

export default IframeAction;
