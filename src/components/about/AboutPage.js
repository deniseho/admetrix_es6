import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import FacebookLogin from 'react-facebook-login';
import LineChart from '../chart/LineChart.js';
import DotChart from '../chart/DotChart.js';

const responseFacebook = (response) => {
  console.log(response);
}

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
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
            scope = "public_profile, email, user_birthday"
            onClick={isLoggedIn ? this.logoutClick : this.loginClick}
            callback={responseFacebook}
            textButton={isLoggedIn ? "facebook 登出" : "facebook 登入"}/>
            {isLoggedIn ? "使用者登入中" : "使用者登出中"}
        <DotChart/>
        <LineChart/>
      </div>
    );
  }
}

export default AboutPage;
