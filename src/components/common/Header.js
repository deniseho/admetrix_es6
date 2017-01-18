import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import SelectInput from '../common/SelectInput';
import {browserHistory} from 'react-router';

function logout(){
    // localStorage.removeItem("admatrixAuth");
    browserHistory.push('/');
}

const Header = ({loading}) => {
  const loginData = JSON
    .parse(localStorage.getItem('admatrixAuth'))


  return (
    <nav className="header">
      <div>
        {loading && <LoadingDots interval={100} dots={20}/>}
        {loginData.name}
        <img src={loginData.picture.data.url}/>
        <button className="btn btn-primary" onClick={logout}>登出</button>
      </div>
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
