import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  videoId: null,
  source: null,
  play: false,
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

const syncPlay = (state, action) => {
  return updateObject(state, { play: action.play });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SCREEN:
      return toggleScreen(state, action);
    case actionTypes.SCREEN_TYPE:
      return getScreenType(state, action);
    case actionTypes.GET_MEDIA:
      return getMedia(state, action);
    case actionTypes.AUTO_PLAY:
      return syncPlay(state, action);
    default:
      return state;
  }
};

export default reducer;
