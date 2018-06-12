import React from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton, Menu, MenuItem } from 'material-ui';
import { withState } from 'recompose';

const TopBarMore = ({ viewer, anchor, setAnchor, login, signUp, logout, createEvent }) => {
  return (
    <div>
      <IconButton onClick={e => setAnchor(e.target)}>
        <Icon>more_vert</Icon>
      </IconButton>
      <Menu open={!!anchor} anchorEl={anchor} onClose={() => setAnchor(null)}>
        <MenuItem onClick={createEvent}>Criar Evento</MenuItem>
        <Choose>
          <When condition={viewer.id}>
            <MenuItem onClick={logout}>Sair</MenuItem>
          </When>
          <Otherwise>
            <MenuItem onClick={signUp}>Cadastrar</MenuItem>
            <MenuItem onClick={login}>Entrar</MenuItem>
          </Otherwise>
        </Choose>
      </Menu>
    </div>
  );
};

TopBarMore.propTypes = {
  viewer: PropTypes.object,
  anchor: PropTypes.object,
  setAnchor: PropTypes.func,
  login: PropTypes.func,
  signUp: PropTypes.func,
  createEvent: PropTypes.func,
  logout: PropTypes.func,
};

const injectState = withState('anchor', 'setAnchor', null);

export default injectState(TopBarMore);
