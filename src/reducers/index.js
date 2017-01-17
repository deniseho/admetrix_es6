import {combineReducers} from 'redux';
import fbResponse from '../reducers/loginReducer.js';
import entireData from '../reducers/dataReducer.js';
import userData from '../reducers/userDataReducer.js';
import dataFilters from '../reducers/dataFilterReducer.js';
import selectedOptions from '../reducers/selectFilterReducer.js';
import axisFilters from '../reducers/axisFilterReducer.js';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress, 
    fbResponse,
    entireData,
    userData,
    dataFilters,
    axisFilters,
    selectedOptions
});

export default rootReducer;
