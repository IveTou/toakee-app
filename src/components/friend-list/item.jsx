import React, { PropTypes } from 'react';
import Avatar from 'react-toolbox/lib/avatar';

const FriendListItem = ({ firstName, photo }) => (
  <div className="FriendListItem">
    <Avatar title={firstName} image={photo} />
    <div className="FriendListItem-name">{firstName}</div>
  </div>
);

FriendListItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  photo: PropTypes.string,
};

FriendListItem.defaultProps = {
  photo: null,
};

export default FriendListItem;
