import {combineReducers} from 'redux';
import entireData from '../reducers/dataResucer.js';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress, 
    entireData
});

export default rootReducer;
