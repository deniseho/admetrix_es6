import {combineReducers} from 'redux';
import fbResponse from './loginReducer.js';
import entireData from './dataReducer.js';
import dataFilters from './dataFilterReducer.js';
import axisFilters from './axisFilterReducer.js';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    ajaxCallsInProgress, 
    fbResponse,
    entireData,
    dataFilters,
    axisFilters,
    routing: routerReducer
});

export default rootReducer;
