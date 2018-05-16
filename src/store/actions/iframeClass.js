import * as actionTypes from "./actionTypes";
import { loadSdk } from "../utility";

class ActClass {
  constructor() {
    this.YTPlayer = null;
  }

  createYT(videoId) {
    return dispatch => {
      loadSdk()
        .then(YT => {
          return new Promise(
            res => {
              // eslint-disable-next-line no-unused-vars
              this.YTPlayer = new YT.Player("player", {
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
                dispatch(this.onReady(true));
                //event.target.playVideo();
              }
              function onPlayerStateChange(event) {
                console.log(event);
                dispatch(this.onStateChange(event.data));
              }
              function onPlaybackQualityChange(event) {
                dispatch(this.onQualityChange(event.data));
                event.target.setPlaybackQuality(event.data);
              }
              function onPlaybackRateChange(event) {
                dispatch(this.onRateChange(event.data));
                event.target.setPlaybackRate(event.data);
              }
              //2 bad videoID, 5html, 100 not found, 101 and 150 owner denial,
              function onPlayerError(event) {
                dispatch(this.onYTError(event.data));
                console.log(event);
              }
            },
            rej => {
              rej(reason => {
                console.log(reason);
              });
            }
          );
        })
        // TODO
        .catch(err => {
          console.log(err);
        });
      console.log(this.YTPlayer);
    };
  }

  onReady(isReady) {
    return {
      type: actionTypes.ON_READY,
      isReady: isReady
    };
  }

  onStateChange = stateNum => {
    return {
      type: actionTypes.ON_STATE_CHANGE,
      stateNum: stateNum
    };
  };

  onQualityChange = quality => {
    return {
      type: actionTypes.ON_QUALITY_CHANGE,
      quality: quality
    };
  };

  onRateChange = rate => {
    return {
      type: actionTypes.ON_RATE_CHANGE,
      rate: rate
    };
  };

  onYTError = errCode => {
    return {
      type: actionTypes.ON_YT_ERROR,
      errCode: errCode
    };
  };

  playYT = () => {
    return dispatch => {
      dispatch(this._internalPlay(this.YTPlayer));
    };
  };

  _internalPlay = player => {
    return dispatch => {
      player.playVideo();
    };
  };
}

export default ActClass;
