import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dataReducer(state = initialState.allData, action) {
  switch (action.type) {
    case types.LOAD_ALLDATA_SUCCESS :
      return action.allData;

    default:
      return state;
  }
}
