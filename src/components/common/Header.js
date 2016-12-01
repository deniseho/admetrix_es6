import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import {chartFormattedForDropdown} from '../../selectors/selectors';
import SelectInput from '../common/SelectInput';
import Filters from '../mainPage/Filters.js';

const Header = ({loading}) => {
  return (
    <nav className="header">
      {loading && <LoadingDots interval={100} dots={20}/>}
      <Filters/>
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
