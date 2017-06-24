import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import classNames from 'classnames';
import { Label, Icon } from 'semantic-ui-react';

import { setAttendanceStatusMutation } from '~/src/toakee-core/mutations/invitations';

import { query } from './index';

const EventGuestListItem = ({ invitation, toggleAttendanceStatus, shadow }) => {
  const { name, status, guestList } = invitation;
  const [firstName, lastName] = name.split(/\s(.+)/);
  const { name: listName } = guestList || { name: null };

  const iconName = status === 'ATTENDED' ? 'checkmark box' : 'square outline';
  const linkColor = status === 'ATTENDED' ? 'green' : 'grey';

  const classes = classNames('EventGuestListItem', {
    'EventGuestListItem-confirmed': status === 'ATTENDED',
    'EventGuestListItem-shadow': status !== 'INVITED' && shadow,
  });

  return (
    <div className={classes}>
      <div className="EventGuestListItem-name">
        <div className="EventGuestListItem-name-first">{firstName}</div>
        <div className="EventGuestListItem-name-last">{lastName}</div>
      </div>
      <div className="EventGuestListItem-right">
        <Label className="EventGuestListItem-right-badge" as="span">
          {listName}
        </Label>
        <Icon
          link
          name={iconName}
          color={linkColor}
          size="large"
          className="EventGuestListItem-right-action"
          onClick={toggleAttendanceStatus}
        />
      </div>
    </div>
  );
};

EventGuestListItem.propTypes = {
  invitation: PropTypes.object,
  toggleAttendanceStatus: PropTypes.func,
  shadow: PropTypes.bool,
};

export default graphql(gql(setAttendanceStatusMutation), {
  props: ({ mutate, ownProps: { event, invitation } }) => ({
    toggleAttendanceStatus: () => {
      const { status } = invitation;
      const newStatus = status === 'ATTENDED' ? 'INVITED' : 'ATTENDED';

      return mutate({
        variables: { eventId: event.id, status: newStatus, invitationId: invitation.id },
        update: (store, { data: { setAttendanceStatus } }) => {
          const data = store.readQuery({ query, variables: { eventSlug: event.slug } });

          data.viewer.event.invitations
            .find(({ id }) => id === invitation.id)
            .status = setAttendanceStatus ? newStatus : status;

          store.writeQuery({ query, data });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          setAttendanceStatus: true,
        },
      });
    },
  }),
})(EventGuestListItem);
