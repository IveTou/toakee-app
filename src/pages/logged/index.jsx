import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { once } from 'lodash';

import TrackingAPI from '~/src/toakee-core/apis/tracking';

import TopBar from '~/src/components/top-bar';
import Dialog from '~/src/components/dialog';

require('./style.scss');

const query = gql`
  query { viewer { id, firstName, photo, isPromoter } }
`;

const tracking = once(id => TrackingAPI.track('Logged Page View', id));

export class Logged extends React.Component {
  componentWillMount(){
    console.log('Will mount');
    console.log(this.props.viewer);
  }

  componentWillReceiveProps({ viewer }) {
    if (viewer.size) {
      console.log('Will receive props');
      console.log(viewer);
      //tracking(viewer.id);
    }
  }

  render() {
    return (
      <div className="Logged">
        <TopBar viewer={this.props.viewer} />
        <Dialog />
        <main className="main">
          {this.props.children}
        </main>
      </div>
    );
  }
}

Logged.propTypes = {
  children: PropTypes.node,
  viewer: PropTypes.object,
  dispatch: PropTypes.func,
};

export default graphql(query, {
  props: ({ data: { viewer } }) => ({ viewer }),
})(Logged);
