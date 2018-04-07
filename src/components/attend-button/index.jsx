import React from 'react';
import PropTypes from 'prop-types';
import { Manager, Target, Popper } from 'react-popper';
import { compose, withState } from 'recompose';
import { graphql } from 'react-apollo';
import {  Button, Divider, Icon, Menu, MenuItem } from 'material-ui';
import { withAuth } from '~/src/components/auth-modal/hoc';

import query, { registerAttendance, unregisterAttendance } from './graphql';

const AttendButton = ({ attendance, toggle, discountLists = [], anchor, setAnchor }) => {
  const menuItemClick = (discountListId) => {
    setAnchor(null);
    discountListId ? toggle(discountListId) : toggle();
  }

  return(
    <div>
      <Button
        onClick={(discountLists.length && !attendance) ? e => setAnchor(e.target) : toggle}
        color={attendance ? 'primary' : 'default'}
        variant="raised"
        style={{ margin: 8 }}
      >
        Vou
        <Icon style={{ marginLeft: 8 }}>thumb_up</Icon>
      </Button>
      <Menu open={!!anchor} anchorEl={anchor} onClose={() => setAnchor(null)}>
        <MenuItem disabled>Selecione uma lista de desconto</MenuItem>
        <Divider light />
        <For each="discountList" of={discountLists}>
          <MenuItem key={discountList.id} onClick={() => menuItemClick(discountList.id)}>
            {discountList.name}
          </MenuItem>
        </For>
        <MenuItem onClick={() => menuItemClick()}>Não colocar nome em lista</MenuItem>
      </Menu>
    </div>
  );
}

AttendButton.propTypes = {
  attendance: PropTypes.object,
  toggle: PropTypes.func,
  discountLists: PropTypes.arrayOf(PropTypes.object),
  anchor: PropTypes.object,
  setAnchor: PropTypes.func,
};

const injectData = graphql(query, {
  options: ({ eventId }) => ({ variables: { eventId } }),
  props: ({ data: { attendance, discountLists } }) => ({ attendance, discountLists }),
});

const options = { refetchQueries: ['Attendance'] };

const injectRegisterAttendance = graphql(registerAttendance, {
  options,
  props: ({ mutate, ownProps: { attendance, eventId, requireLogin } }) => ({
    [attendance ? '_' : 'toggle']: (
      requireLogin((_, discountListId) => mutate({ variables: { eventId, discountListId } }))
    )
  }),
});

const injectUnregisterAttendance = graphql(unregisterAttendance, {
  options,
  props: ({ mutate, ownProps: { attendance, eventId } }) => ({
    [attendance ? 'toggle' : '_']: () => mutate({ variables: { eventId } }),
  }),
});

const injectState = withState('anchor', 'setAnchor', null);

export default compose(
  withAuth,
  injectData,
  injectState,
  injectRegisterAttendance,
  injectUnregisterAttendance,
)(AttendButton);
