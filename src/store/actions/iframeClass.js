import * as actionTypes from "./actionTypes";
import { loadSdk, eventNames } from "../utility";

<<<<<<< HEAD
class ActClass {
  constructor() {
    this.YTPlayer = null;
=======
class IframeAction {
  constructor(props) {
    this.props = props;
>>>>>>> parent of c6ed91b... before class Iframe implemented
  }

  createYT(videoId) {
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
<<<<<<< HEAD
          );
=======

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
>>>>>>> parent of c6ed91b... before class Iframe implemented
        })
        // TODO
        .catch(err => {
          console.log(err);
        });
      console.log(this.YTPlayer);
    };
  }

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

<<<<<<< HEAD
export default ActClass;
=======
export default IframeAction;
>>>>>>> parent of c6ed91b... before class Iframe implemented
