import React, {PropType} from 'react';

class EnsureLoggedInContainer extends React.Component {
  render() {
      return(
      <div>
        {this.props.children}
      </div>
      )
  }
}

export default EnsureLoggedInContainer;