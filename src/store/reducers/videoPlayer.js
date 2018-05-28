import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  videoId: null,
  source: null,
  error: false,
  isScreen: true,
  open: false,
  socketPlay: false,
  socketMaster: null,
  mySocketId: null,
  socketYTError: null,
  socketState: null,
  socketPlace: null
};

const toggleScreen = (state, action) => {
  return updateObject(state, { open: !state.open });
};

const getScreenType = (state, action) => {
  return updateObject(state, { isScreen: action.isScreen });
};

const getMedia = (state, action) => {
  return updateObject(state, {
    source: action.source,
    videoId: action.videoId
  });
};

const onError = (state, action) => {
  return updateObject(state, { error: action.error });
};

const setSocketPlay = (state, action) => {
  return updateObject(state, { socketPlay: action.socketPlay });
};

const setSocketYTError = (state, action) => {
  return updateObject(state, { socketYTError: action.socketYTError });
};

const setSocketState = (state, action) => {
  return updateObject(state, { socketState: action.socketState });
};

const setSocketPlace = (state, action) => {
  return updateObject(state, { socketPlace: action.socketPlace });
};

const setSocketMaster = (state, action) => {
  return updateObject(state, { socketMaster: action.socketMaster });
};

const setMySocketId = (state, action) => {
  return updateObject(state, { mySocketId: action.mySocketId });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SCREEN:
      return toggleScreen(state, action);
    case actionTypes.SCREEN_TYPE:
      return getScreenType(state, action);
    case actionTypes.GET_MEDIA:
      return getMedia(state, action);
    case actionTypes.ON_ERROR:
      return onError(state, action);
    case actionTypes.SET_SOCKET_PLAY:
      return setSocketPlay(state, action);
    case actionTypes.SET_SOCKET_MASTER:
      return setSocketMaster(state, action);
    case actionTypes.SET_MY_SOCKET_ID:
      return setMySocketId(state, action);
    case actionTypes.SET_SOCKET_YT_ERROR:
      return setSocketYTError(state, action);
    case actionTypes.SET_SOCKET_STATE:
      return setSocketState(state, action);
    case actionTypes.SET_SOCKET_PLACE:
      return setSocketPlace(state, action);
    default:
      return state;
  }
};

export default reducer;
