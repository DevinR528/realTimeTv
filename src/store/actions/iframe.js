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
          function onPlaybackQualityChange(event) {
            dispatch(onQualityChange(event.data));
            event.target.setPlaybackQuality(event.data);
          }
          function onPlaybackRateChange(event) {
            dispatch(onRateChange(event.data));
            event.target.setPlaybackRate(event.data);
          }
          //2 bad videoID, 5html, 100 not found, 101 and 150 owner denial,
          function onPlayerError(event) {
            dispatch(onYTError(event.data));
            console.log(event);
          }
          res = player;
          return res;
        });
        return YT;
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
