// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import Login from '../components/login/Login.js';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loginClick = this
      .loginClick
      .bind(this);
    this.logoutClick = this
      .logoutClick
      .bind(this);
    this.state = {
      isLoggedIn: false
    };
  }

  loginClick() {
    alert("login");
    this.setState({isLoggedIn: true});
    this.setState({userName: true});
  }

  logoutClick() {
    alert("logout");
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    console.log(isLoggedIn);
    return (
      <div>
        <FacebookLogin
          appId="599058140278385"
          autoLoad={true}
          fields="name, email, picture"
          scope="public_profile, email, user_birthday"
          onClick={isLoggedIn ? this.logoutClick : this.loginClick}
          callback={responseFacebook}
          textButton={isLoggedIn ? "facebook 登出" : "facebook 登入"}/> 
          {isLoggedIn ? "使用者登入中" : "使用者登出中"}

          {isLoggedIn ? <Header loading={this.props.loading}/> : ''}

          {isLoggedIn ? this.props.children: ''}
 
      </div>
    );
  }
}

App.propTypes = {
  // children: PropTypes.object.isRequired, loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
