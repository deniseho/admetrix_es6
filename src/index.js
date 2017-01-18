/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {login} from './actions/loginActions.js';
import {loadEntireData} from './actions/dataActions.js';
import {setDataFilterOptions} from './actions/dataFilterActions.js';
import {setAxisFilterOptions} from './actions/axisFilterActions.js';
import {Provider} from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import routes from './routes';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import './styles/styles.css';
import '../node_modules/react-bootstrap-theme-switcher/themes/paper/bootstrap.css';

const store = configureStore();
store.dispatch(login());
store.dispatch(setAxisFilterOptions());
store.dispatch(loadEntireData());
store.dispatch(setDataFilterOptions());

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  
  document.getElementById('app')
);






