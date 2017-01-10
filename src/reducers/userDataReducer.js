import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function dataReducer(state = initialState.entireData, action) {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
      return action.userData; 
    default:
      return state;
  }
}

