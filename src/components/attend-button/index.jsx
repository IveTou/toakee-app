import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { Button, Divider, Icon, Menu, MenuItem } from 'material-ui';
import { withAuth } from '~/src/components/auth-modal/hoc';

import query, { registerAttendance, unregisterAttendance } from './graphql';
import { withIndexStyle } from './styles';

const AttendButton = ({
  attendance,
  toggle,
  discountLists = [],
  anchor,
  setAnchor,
  classes,
  menuClose,
  menuItemClick,
  buttonClick,
}) => {

  return(
    <div>
      <Button
        onClick={e => buttonClick(e)}
        color={attendance ? 'primary' : 'default'}
        variant="raised"
        className={classes.button}
      >
        Vou
        <Icon className={classes.icon}>thumb_up</Icon>
      </Button>
      <Menu open={!!anchor} anchorEl={anchor} onClose={menuClose}>
        <MenuItem disabled>Selecione uma lista de desconto</MenuItem>
        <Divider light />
        <For each="discountList" of={discountLists}>
          <MenuItem key={discountList.id} onClick={() => menuItemClick(discountList.id)}>
            {discountList.name}
          </MenuItem>
        </For>
        <MenuItem onClick={() => menuItemClick(null)}>Não colocar nome em lista</MenuItem>
      </Menu>
    </div>
  );
}

AttendButton.propTypes = {
  classes: PropTypes.object,
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

const injectHandlers = withHandlers({
  menuClose: ({ setAnchor }) => () => setAnchor(null),
  menuItemClick: ({ toggle, setAnchor }) => discountListId => {
    setAnchor(null)
    toggle(discountListId)
  },
  buttonClick: ({ setAnchor, discountLists, attendance, toggle}) => e => {
    (discountLists.length && !attendance) ? setAnchor(e.target) : toggle()
  }
});

export default compose(
  withAuth,
  injectData,
  injectState,
  injectRegisterAttendance,
  injectUnregisterAttendance,
  injectHandlers,
  withIndexStyle,
)(AttendButton);
