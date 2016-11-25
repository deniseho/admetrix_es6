import React from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions.js';

import DotChart from '../chart/DotChart.js';
import Uploader from '../common/Uploader.js';
import SelectInput from '../common/SelectInput';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {data} = this.props;

    return (
      <div>
        <Uploader/>
        <DotChart data={data}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    data: state.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dataActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

