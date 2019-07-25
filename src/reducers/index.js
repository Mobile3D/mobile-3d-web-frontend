import { combineReducers } from 'redux'
import {
  AUTHORIZE,
  UNAUTHORIZE
} from '../actions';

function authorization(state = false, action) {
  switch (action.type) {
    case AUTHORIZE:
      return action.payload;
    case UNAUTHORIZE:
      return action.payload;
    default:
      return state;
  }
}

const printApp = combineReducers({
  authorization
});

export default printApp;