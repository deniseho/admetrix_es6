import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
import BasicChart from '../chart/BasicChart.js';

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <BasicChart/>
    );
  }
}

export default AboutPage;
