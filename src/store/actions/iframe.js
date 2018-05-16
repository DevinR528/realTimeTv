import * as actionTypes from "./actionTypes";
import { loadSdk } from "../utility";

export const createYT = videoId => {
  return dispatch => {
    loadSdk()
      .then(YT => {
        return new Promise(res => {
          // eslint-disable-next-line no-unused-vars
          const player = new YT.Player("player", {
            height: "200",
            width: "369",
            videoId: `${videoId}`,
            events: {
              onReady: onPlayerReady,
              onStateChange: onPlayerStateChange,
              playbackQualityChange: onPlaybackQualityChange,
              playbackRateChange: onPlaybackRateChange,
              onError: onPlayerError
            }
          });
          function onPlayerReady(event) {
            dispatch(onReady(true));
            //event.target.playVideo();
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

export const onQualityChange = quality => {
  return {
    type: actionTypes.ON_QUALITY_CHANGE,
    quality: quality
  };
};

export const onRateChange = rate => {
  return {
    type: actionTypes.ON_RATE_CHANGE,
    rate: rate
  };
};

export const onYTError = errCode => {
  return {
    type: actionTypes.ON_YT_ERROR,
    errCode: errCode
  };
};

export const playYT = () => {
  return dispatch => {
    dispatch(_internalPlay());
  };
};

export const _internalPlay = player => {
  return dispatch => {
    player.playVideo();
  };
};
