import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import MainPage from './components/mainPage/MainPage';
import Login from './components/login/Login.js';
import Homepage from './components/common/HomePage.js';

const routes = (
  <Route component={App}>
    <Route path='mainPage' component={MainPage}/>
  </Route>
);

const basicRoutes = (
  <Route>
    <Route path='login' component={Login}/>
  </Route>
);

const combinedRoutes = (
  <Route>
    <Route>
      {routes}
    </Route>
    <Route>
      {basicRoutes}
    </Route>
  </Route>
);

export default(
  <Route>
    <Route path='/' component={Homepage}/>
      <Route>
        {combinedRoutes}
      </Route>
  </Route>
)
