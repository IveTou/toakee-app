import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { removeInvitation } from '~/src/toakee-core/ducks/invitations';
import { dialogConfirm } from '~/src/toakee-core/ducks/dialog';

declare var idx;
declare var invitation;

export const EventGuestListEditInvitationsList = ({ invitationsList, deleteInvitation }) => (
  <div className="EventGuestListEditItem-invitations">
    <For each="invitation" index="idx" of={invitationsList}>
      <div key={idx} className="EventGuestListEditItem-invitations-item">
        {invitation.name}
        <Icon
          onClick={deleteInvitation(invitation.eventId, invitation.id)}
          name="remove"
          className="EventGuestListEditItem-invitations-item-remove"
        />
      </div>
    </For>
  </div>
);

EventGuestListEditInvitationsList.propTypes = {
  invitationsList: PropTypes.array,
  deleteInvitation: PropTypes.func,
};

export default connect(() => ({}), dispatch => ({
  deleteInvitation: (eventId, invitationId) => () => {
    const title = 'Tem certeza que deseja remover o nome da lista?';
    const onConfirm = () => dispatch(removeInvitation(eventId, invitationId));
    const confirmTrigger = { color: 'red', icon: 'trash' };

    dispatch(dialogConfirm(title, onConfirm, { confirmTrigger }));
  },
}))(EventGuestListEditInvitationsList);
