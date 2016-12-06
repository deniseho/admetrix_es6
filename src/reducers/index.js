import {combineReducers} from 'redux';
import entireData from '../reducers/dataReducer.js';
import axisFilters from '../reducers/axisFilterReducer.js';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress, 
    entireData,
    axisFilters
});

export default rootReducer;
