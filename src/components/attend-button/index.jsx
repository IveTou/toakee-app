import React, { PropTypes } from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { Button } from 'semantic-ui-react';
import { withAuth } from '~/src/components/auth-modal/hoc';

import query, { registerAttendance, unregisterAttendance } from './graphql';

const AttendButton = ({ attendance, toggle }) => (
  <Button
    onClick={toggle}
    basic={!attendance}
    size="small"
    content="Vou"
    icon="checkmark"
    color="green"
  />
);

AttendButton.propTypes = {
  attendance: PropTypes.object,
  toggle: PropTypes.func,
};

const injectData = graphql(query, {
  options: ({ eventId }) => ({ variables: { eventId } }),
  props: ({ data: { attendance } }) => ({ attendance }),
});

const options = { refetchQueries: ['Attendance'] };

const injectRegisterAttendance = graphql(registerAttendance, {
  options,
  props: ({ mutate, ownProps: { attendance, eventId, requireLogin } }) => ({
    [attendance ? '_' : 'toggle']: (
      requireLogin(() => mutate({ variables: { eventId } }))
    )
  }),
});

const injectUnregisterAttendance = graphql(unregisterAttendance, {
  options,
  props: ({ mutate, ownProps: { attendance, eventId, requireLogin } }) => ({
    [attendance ? 'toggle' : '_']: (
      requireLogin(() => mutate({ variables: { eventId } }))
    ),
  }),
});


export default compose(
  withAuth,
  injectData,
  injectRegisterAttendance,
  injectUnregisterAttendance,
)(AttendButton);
