import React from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions.js';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <h1>home</h1>
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

