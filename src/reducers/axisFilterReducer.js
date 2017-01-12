import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function axisFilterReducer(state = initialState.axisOptions, action) {
  switch (action.type) {
    case types.SET_AXIS_FILTER_OPTIONS_SUCCESS:
      return action.axisOptions;

    case types.SET_YAXIS_FILTER_OPTIONS_SUCCESS:
      return action.yAxisOptions;

    default:
      return state;
  }
}
