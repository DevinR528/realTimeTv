import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  isReady: false,
  stateNum: null,
  ytErrCode: null,
  ytPlace: null,
  videoDone: false
};

const onReady = (state, action) => {
  return updateObject(state, {
    isReady: action.isReady
  });
};

const onStateChange = (state, action) => {
  return updateObject(state, {
    stateNum: action.stateNum
  });
};

const onYTError = (state, action) => {
  return updateObject(state, {
    ytErrCode: action.ytErrCode
  });
};

const onPlaceChange = (state, action) => {
  return updateObject(state, {
    ytPlace: action.ytPlace
  });
};

const onEndReset = (state, action) => {
  return updateObject(state, {
    isReady: false,
    stateNum: null,
    rate: null,
    ytErrCode: null,
    ytPlace: null,
    videoDone: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_READY:
      return onReady(state, action);
    case actionTypes.ON_STATE_CHANGE:
      return onStateChange(state, action);
    case actionTypes.ON_YT_ERROR:
      return onYTError(state, action);
    case actionTypes.ON_YT_PLACE:
      return onPlaceChange(state, action);
    case actionTypes.ON_END_RESET:
      return onEndReset(state, action);
    default:
      return state;
  }
};

export default reducer;
