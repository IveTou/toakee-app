import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton, Menu, MenuItem } from 'material-ui';
import { withState } from 'recompose';

const TopBarAvatar = ({ viewer, anchor, setAnchor, logout, dashboard }) => {
  return (
    <If condition={viewer.id}>
      <IconButton onClick={e => setAnchor(e.target)}>
        <Avatar>{viewer.firstName[0]}</Avatar>
      </IconButton>
      <Menu open={!!anchor} anchorEl={anchor} onClose={() => setAnchor(null)}>
        <MenuItem onClick={logout()}>Sair</MenuItem>
      </Menu>
    </If>
  );
};

TopBarAvatar.propTypes = {
  viewer: PropTypes.object,
  anchor: PropTypes.object,
  setAnchor: PropTypes.func,
  dashboard: PropTypes.func,
  logout: PropTypes.func,
};

const injectState = withState('anchor', 'setAnchor', null);

export default injectState(TopBarAvatar);
