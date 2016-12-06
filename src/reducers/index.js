import {combineReducers} from 'redux';
import dataReducer from '../reducers/dataResucer.js';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({ajaxCallsInProgress, dataReducer});

export default rootReducer;
