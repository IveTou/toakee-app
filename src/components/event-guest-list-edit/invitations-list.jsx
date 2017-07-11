import React, { PropTypes } from 'react';
import { sortBy } from 'lodash';
import { Icon } from 'semantic-ui-react';

declare var idx;
declare var invitation;

export const EventGuestListEditInvitationsList = ({
  invitationsList,
  removeInvitation,
}) => (
  <div className="EventGuestListEditItem-invitations">
    <For each="invitation" index="idx" of={sortBy(invitationsList, ['name'])}>
      <div key={idx} className="EventGuestListEditItem-invitations-item">
        {invitation.name}
        <Icon
          onClick={() => removeInvitation(invitation)}
          name="remove"
          className="EventGuestListEditItem-invitations-item-remove"
        />
      </div>
    </For>
  </div>
);

EventGuestListEditInvitationsList.propTypes = {
  invitationsList: PropTypes.array,
  removeInvitation: PropTypes.func,
};

export default EventGuestListEditInvitationsList;
