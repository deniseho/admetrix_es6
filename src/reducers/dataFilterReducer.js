import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dataFilterReducer(
    state = initialState.dataFilterOptions, action) {
  switch (action.type) {
    case types.SET_DATA_FILTER_OPTIONS_SUCCESS:
      return action.dataFilters;

    default:
      return state;
  }
}

