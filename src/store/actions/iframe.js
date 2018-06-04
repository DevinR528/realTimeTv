import * as actionTypes from "./actionTypes";
import { loadSdk } from "../utility";

export const createYT = videoId => {
  return dispatch => {
    return new Promise(resolve => {
      loadSdk().then(YT => {
        const playerObj = new YT.Player("player", {
          height: "275",
          width: "470",
          videoId: `${videoId}`,
          playerVars: { origin: window.location.origin },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            playbackQualityChange: onPlaybackQualityChange,
            playbackRateChange: onPlaybackRateChange,
            onError: onPlayerError
          }
        });
        resolve(playerObj);
        function onPlayerReady(event) {
          dispatch(onReady(true));
        }
        // -1 un-started, 0 end, 1 play, 2 pause, 3 buff, 5 cued
        function onPlayerStateChange(event) {
          switch (event.data) {
            case 1:
              dispatch(onStateChange(event.data));
              const playPlace = event.target.getCurrentTime();
              dispatch(onPlaceChange(playPlace));
              break;
            case 2:
              dispatch(onStateChange(event.data));
              const pausePlace = event.target.getCurrentTime();
              dispatch(onPlaceChange(pausePlace));
              break;
            case 3:
              dispatch(onStateChange(event.data));
              const buffPlace = event.target.getCurrentTime();
              dispatch(onPlaceChange(buffPlace));
              break;
            case 0:
              break;
            case -1:
              break;
            default:
              break;
          }
        }
        function onPlaybackQualityChange(event) {
          event.target.setPlaybackQuality(event.data);
        }
        function onPlaybackRateChange(event) {
          event.target.setPlaybackRate(event.data);
        }
        //2 bad videoID, 5html, 100 not found, 101 and 150 owner denial,
        function onPlayerError(event) {
          dispatch(onYTError(event.data));
          console.log(`[createYTaction] ${event.data}`);
          console.dir(event);
        }
      });
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

export const onYTError = errCode => {
  return {
    type: actionTypes.ON_YT_ERROR,
    errCode: errCode
  };
};

export const onPlaceChange = ytPlace => {
  return {
    type: actionTypes.ON_YT_PLACE,
    ytPlace: ytPlace
  };
};
