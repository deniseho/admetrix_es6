import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import FacebookLogin from 'react-facebook-login';
import {browserHistory} from 'react-router';

const responseFacebook = (response) => {
  localStorage.setItem("admatrixAuth", JSON.stringify(response));
}


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.loginClick = this
      .loginClick
      .bind(this);
    this.logoutClick = this
      .logoutClick
      .bind(this);
    this.state = {
      isLoggedIn: props.fbResponse.accessToken ? true : false
      // isLoggedIn: false
    };
  }

  loginClick() {
    this.setState({isLoggedIn: true});
    browserHistory.push('/mainPage');
  }

  logoutClick() {
    this.setState({isLoggedIn: false});
    localStorage.removeItem("admatrixAuth");
    browserHistory.push('/');
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const loginName = this.props.fbResponse.name;
    const loginPicture = this.props.fbResponse.picture.data.url;

    return (
      <div>
        <FacebookLogin
          appId="599058140278385"
          autoLoad={true}
          fields="name, email, picture"
          scope="public_profile, email, user_birthday"
          onClick={isLoggedIn
          ? this.logoutClick
          : this.loginClick}
          callback={responseFacebook}
          textButton={isLoggedIn
          ? " 登出"
          : " 登入"}
          cssClass={isLoggedIn
          ? "btn"
          : "btn primary"}
           icon="fa-facebook"/>
        <img src={isLoggedIn
          ? loginPicture
          : ""}/> {isLoggedIn
          ? loginName + " 歡迎!"
          : "已登出"}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    fbResponse: state.fbResponse
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);