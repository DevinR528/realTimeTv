import * as actionTypes from "./actionTypes";
import { loadSdk } from "../utility";

export const createYT = (videoId, controls) => {
  return dispatch => {
    return new Promise(resolve => {
      loadSdk().then(YT => {
        const playerObj = new YT.Player("player", {
          height: "200",
          width: "369",
          videoId: `${videoId}`,
          playerVars: { controls: controls },
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
          //event.target.playVideo();
        }
        function onPlayerStateChange(event) {
          dispatch(onStateChange(event.data));
          if (event.data === 2) {
            const place = event.target.getCurrentTime();
            dispatch(onPlaceChange(place));
          } else if (event.data === 0) {
            dispatch(onEndReset());
          }
        }
        function onPlaybackQualityChange(event) {
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

export const onPlaceChange = ytPlace => {
  return {
    type: actionTypes.ON_YT_PLACE,
    ytPlace: ytPlace
  };
};

export const onEndReset = () => {
  return {
    type: actionTypes.ON_END_RESET
  };
};
