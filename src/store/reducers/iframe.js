import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  isReady: false,
  stateNum: null,
  quality: null,
  rate: null,
  errCode: null
};
const onReady = (state, action) => {
  return updateObject(state, {
    setYTPlayer: action.isReady,
    isReady: action.isReady
  });
};

const onStateChange = (state, action) => {
  return updateObject(state, {
    stateNum: action.stateNum
  });
};

const onQualityChange = (state, action) => {
  return updateObject(state, {
    quality: action.quality
  });
};

const onRateChange = (state, action) => {
  return updateObject(state, {
    rate: action.rate
  });
};

const onYTError = (state, action) => {
  return updateObject(state, {
    errCode: action.errCode
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_READY:
      return onReady(state, action);
    case actionTypes.ON_STATE_CHANGE:
      return onStateChange(state, action);
    case actionTypes.ON_QUALITY_CHANGE:
      return onQualityChange(state, action);
    case actionTypes.ON_RATE_CHANGE:
      return onRateChange(state, action);
    case actionTypes.ON_YT_ERROR:
      return onYTError(state, action);
    default:
      return state;
  }
};

export default reducer;
