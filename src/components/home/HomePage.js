import React from 'react';
import {Link} from 'react-router';
import data from '../../api/data.js';
import BasicChart from '../chart/BasicChart.js';

class HomePage extends React.Component {
  render() {
    return (
      <BasicChart/>
    );
  }
}

export default HomePage;
