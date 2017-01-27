import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import FriendList from '~/src/components/friend-list';

const Home = ({ viewer }) => (
  <div><FriendList viewer={viewer} /></div>
);

Home.propTypes = {
  viewer: PropTypes.object.isRequired,
};

export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Profile {
        ${FriendList.getFragment('viewer')}
      }
    `,
  },
});
