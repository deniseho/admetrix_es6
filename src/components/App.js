// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Login from './loginPage/Login';

const responseFacebook = (response) => {
  localStorage.setItem("admatrixAuth", JSON.stringify(response));
}


class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
          <Login />
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
