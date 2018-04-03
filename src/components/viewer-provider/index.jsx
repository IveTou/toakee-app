import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import query from './graphql';

export class ViewerProvider extends React.Component {
  getChildContext() {
    return { viewer: this.props.viewer };
  }

  render() {
    return this.props.loading
      ? <div className="ToakeeLoader" />
      : <div>{this.props.children}</div>;
  }
}

ViewerProvider.propTypes = {
  viewer: PropTypes.object,
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ViewerProvider.childContextTypes = {
  viewer: PropTypes.object,
};

export default graphql(query, {
  props: ({ data: { viewer, loading } }) => ({ viewer, loading }),
})(ViewerProvider);
