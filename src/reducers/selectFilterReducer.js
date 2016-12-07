import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function selectFilterReducer(
    state = initialState.selectedOptions, action) {
  switch (action.type) {
    case types.SELECT_FILTER_OPTIONS_SUCCESS:
      return action.selectedOptions;

    default:
      return state;
  }
}

