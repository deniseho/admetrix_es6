import {combineReducers} from 'redux';
import fbResponse from '../reducers/loginReducer.js';
import entireData from '../reducers/dataReducer.js';
import dataFilters from '../reducers/dataFilterReducer.js';
import axisFilters from '../reducers/axisFilterReducer.js';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress, 
    fbResponse,
    entireData,
    dataFilters,
    axisFilters
});

export default rootReducer;
