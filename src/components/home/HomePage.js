import React from 'react';
import {Link} from 'react-router';
import data from '../../api/data.js';
import LineChart from '../chart/LineChart.js';
import DotChart from '../chart/DotChart.js';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <DotChart/>
        <LineChart/>
      </div>
    );
  }
}

export default HomePage;
