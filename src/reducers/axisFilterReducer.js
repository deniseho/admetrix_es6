import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function axisFilterReducer(state = initialState.axisFilters, action) {
  switch (action.type) {
    case types.SET_AXIS_FILTER_OPTIONS_SUCCESS:
      return action.axisFilters;

    default:
      return state;
  }
}
