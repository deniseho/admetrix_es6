import React, {PropType} from 'react';

import {connect} from 'react-redux';

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {

  }

  render() {
      return(
      <div>
        {this.props.children}
      </div>
      )
  }
}

export default EnsureLoggedInContainer;