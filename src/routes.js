import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import EnsureLoggedInContainer from './components/common/EnsureLoggedInContainer.js';
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default

export default(
  <Route path="/" component={App}>
    <Route component={EnsureLoggedInContainer}>
      <IndexRoute component={ManageCoursePage}/>
    </Route>
  </Route>
);
