import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class Scroller extends React.Component {
  componentDidUpdate(prevProps) {
    if(this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

Scroller.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  location: PropTypes.object,
};

export default withRouter(Scroller);
