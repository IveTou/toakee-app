import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Label, Icon } from 'semantic-ui-react';

const EventGuestListItem = ({ invitation, onChangeStatus, shadow }) => {
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
          onClick={onChangeStatus}
        />
      </div>
    </div>
  );
};

EventGuestListItem.propTypes = {
  invitation: PropTypes.object,
  onChangeStatus: PropTypes.func,
  shadow: PropTypes.bool,
};

export default EventGuestListItem;
