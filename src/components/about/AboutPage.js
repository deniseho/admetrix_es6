import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import LineChart from '../chart/LineChart.js';
import DotChart from '../chart/DotChart.js';

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <DotChart/>
        <LineChart/>
      </div>
    );
  }
}

export default AboutPage;
