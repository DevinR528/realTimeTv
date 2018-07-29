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

export const setSocketPlay = shouldPlay => {
  return {
    type: actionTypes.SET_SOCKET_PLAY,
    socketPlay: shouldPlay
  };
};

export const setSocketMaster = socketMasterId => {
  return {
    type: actionTypes.SET_SOCKET_MASTER,
    socketMaster: socketMasterId
  };
};

export const setSocketPlace = socketPlace => {
  return {
    type: actionTypes.SET_SOCKET_PLACE,
    socketPlace: socketPlace
  };
};

export const setSocketYTError = socketYTError => {
  return {
    type: actionTypes.SET_SOCKET_YT_ERROR,
    socketYTError: socketYTError
  };
};

export const setSocketState = socketState => {
  return {
    type: actionTypes.SET_SOCKET_STATE,
    socketState: socketState
  };
};
