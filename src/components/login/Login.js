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
  }

  loginClick() {
    browserHistory.push('/mainPage');
  }


  render() {
    const loginName = this.props.fbResponse.name;
    const loginPicture = this.props.fbResponse.picture.data.url;

    return (
      <div>
        <FacebookLogin
          appId="599058140278385"
          autoLoad={true}
          fields="name, email, picture"
          scope="public_profile, email, user_birthday"
          onClick={this.loginClick}
          callback={responseFacebook}
          textButton={" 登入帳號"}
          cssClass={"btn btn-primary"}
          icon="fa-facebook"/>
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