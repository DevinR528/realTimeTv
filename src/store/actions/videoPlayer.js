import * as actionTypes from "./actionTypes";

export const toggleScreen = () => {
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

export const onError = err => {
  return {
    type: actionTypes.ON_ERROR,
    error: err
  };
};
