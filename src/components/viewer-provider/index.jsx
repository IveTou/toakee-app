import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';

import query from './graphql';

export class ViewerProvider extends React.Component {
  getChildContext() {
    return { viewer: this.props.viewer };
  }

  render() {
    return this.props.loading ? <div className="loader" /> : <div>{this.props.children}</div>;
  }
}

ViewerProvider.propTypes = {
  viewer: PropTypes.object,
  loading: PropTypes.boolean,
  children: React.PropTypes.oneOfType([
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
