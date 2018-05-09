import * as actionTypes from "./actionTypes";

export const toggleScreen = optForceOpen => {
  return {
    type: actionTypes.TOGGLE_SCREEN
  };
};

export const getScreenType = screen => {
  return {
    type: actionTypes.SCREEN_TYPE,
    isScreen: screen
  };
};

export const getMedia = (source, videoId) => {
  return {
    type: actionTypes.GET_MEDIA,
    source: source,
    videoId: videoId
  };
};

export const syncMedia = play => {
  return {
    type: actionTypes.AUTO_PLAY,
    play: play
  };
};
