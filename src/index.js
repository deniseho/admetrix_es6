/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {loadEntireData} from './actions/dataActions.js';
import {setProjectFilterOptions} from './actions/dataFilterActions.js';
import {setAxisFilterOptions} from './actions/axisFilterActions.js';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
store.dispatch(loadEntireData());
store.dispatch(setAxisFilterOptions());
store.dispatch(setProjectFilterOptions());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  
  document.getElementById('app')
);






