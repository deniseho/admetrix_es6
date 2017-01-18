import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Login from '../components/login/Login.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
          <Header loading={this.props.loading} />
          {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state, dispatch) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
