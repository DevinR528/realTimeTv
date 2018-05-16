import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  isReady: false,
  stateNum: null
};
const onReady = (state, action) => {
  return updateObject(state, { setYTPlayer: action.isReady });
};

const onStateChange = (state, action) => {
  return updateObject(state, {
    stateNum: action.stateNum
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_READY:
      return onReady(state, action);
    case actionTypes.ON_STATE_CHANGE:
      return onStateChange(state, action);
    default:
      return state;
  }
};

export default reducer;
