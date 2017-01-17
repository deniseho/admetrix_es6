// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  localStorage.setItem("admatrixAuth", JSON.stringify(response));
  console.log(response);
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
      isLoggedIn: false
    };
  }

  loginClick() {
    this.setState({isLoggedIn: true});
  }

  logoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const loginName = JSON
      .parse(localStorage.getItem("admatrixAuth"))
      .name;
    const loginPicture = JSON
      .parse(localStorage.getItem("admatrixAuth"))
      .picture
      .data
      .url;

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

export default Login;
