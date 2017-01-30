import React from 'react';
import Relay from 'react-relay';

import FriendListItem from './item';

require('./style.scss');

const FriendList = ({ viewer }) => {
  const items = viewer.friends.edges.map(({ node }) => (
    <FriendListItem key={node.id} {...node} />
  ));

  return (
    <div className="FriendList">
      {items}
    </div>
  );
};

FriendList.propTypes = {
  viewer: PropTypes.shape({
    friends: PropTypes.arrayOf(Object),
  }).isRequired,
};

export default Relay.createContainer(FriendList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Profile {
        friends(first: 10) {
          edges {
            node {
              id
              firstName
              photo
            }
          }
        }
      }
    `,
  },
});
