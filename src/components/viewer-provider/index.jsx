import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';

import query from './graphql';

export class ViewerProvider extends React.Component {
  getChildContext() {
    return { viewer: this.props.viewer };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

ViewerProvider.propTypes = {
  viewer: PropTypes.object,
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ViewerProvider.childContextTypes = {
  viewer: PropTypes.object,
};

export default graphql(query, {
  props: ({ data: { viewer } }) => ({ viewer }),
})(ViewerProvider);
