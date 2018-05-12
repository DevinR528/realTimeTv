import * as actionTypes from "./actionTypes";
import { loadSdk, eventNames } from "../utility";

export const createYT = videoId => {
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
            dispatch(onReady(true));
            event.target.playVideo();
          }
          function onPlayerStateChange(event) {
            console.log(event);
            dispatch(onStateChange(event.data));
          }

          Object.keys(eventNames).forEach(ytName => {
            const ytFiredEvents = eventNames[ytName];
            console.log(ytFiredEvents);
          });
        });
      })
      // TODO
      .catch(err => {
        console.log(err);
      });
  };
};

export const onReady = isReady => {
  return {
    type: actionTypes.ON_READY,
    isReady: isReady
  };
};

export const onStateChange = stateNum => {
  return {
    type: actionTypes.ON_STATE_CHANGE,
    stateNum: stateNum
  };
};

export const getControlPlayer = vidSrc => {
  return {};
};
