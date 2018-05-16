import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  videoId: null,
  source: null,
  error: false,
  place: 0,
  isScreen: true,
  open: false
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
    default:
      return state;
  }
};

export default reducer;
