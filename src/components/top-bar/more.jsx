import React from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton, Menu, MenuItem } from 'material-ui';
import { withState } from 'recompose';

const TopBarMore = ({ viewer, anchor, setAnchor, login, signUp, newEvent}) => {
  return (
    <If condition={!viewer.id}>
      <IconButton onClick={e => setAnchor(e.target)}>
        <Icon>more_vert</Icon>
      </IconButton>
      <Menu open={!!anchor} anchorEl={anchor} onClose={() => setAnchor(null)}>
        <MenuItem onClick={newEvent()}>Criar Evento</MenuItem>
        <MenuItem onClick={signUp()}>Cadastrar</MenuItem>
        <MenuItem onClick={login()}>Entrar</MenuItem>
      </Menu>
    </If>
  );
};

TopBarMore.propTypes = {
  viewer: PropTypes.object,
  anchor: PropTypes.object,
  setAnchor: PropTypes.func,
  login: PropTypes.func,
  signUp: PropTypes.func,
  newEvent: PropTypes.func,
};

const injectState = withState('anchor', 'setAnchor', null);

export default injectState(TopBarMore);
