import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { changeAttendanceStatus } from '~/src/toakee-core/ducks/invitations';

import Badge from '~/src/components/badge';
import Button from '~/src/components/button';

const EventGuestListItem = ({ dispatch, id, name, status, guestListId, guestLists }) => {
  const [firstName, lastName] = name.split(/\s(.+)/);
  const data = guestLists.get('data');
  const guestList = !!data.size && data.get(guestListId);
  const { name: listName } = guestList || { name: null };

  const [buttonLabel, buttonColor, statusChange] = (() => (
    status === 'INVITED'
      ? ['o/', { accent: true }, 'ATTENDED']
      : [<i className="fa fa-check" />, { success: true }, 'INVITED']
  ))();

  const classes = classNames('EventGuestListItem', {
    'EventGuestListItem-confirmed': status === 'ATTENDED',
  });

  return (
    <div className={classes}>
      <div className="EventGuestListItem-name">
        <div className="EventGuestListItem-name-first">{firstName}</div>
        <div className="EventGuestListItem-name-last">{lastName}</div>
      </div>
      <div className="EventGuestListItem-right">
        <Badge className="EventGuestListItem-right-badge" label={listName} />
        <Button
          className="EventGuestListItem-right-action"
          label={buttonLabel}
          onClick={() => dispatch(changeAttendanceStatus(id, statusChange))}
          {...buttonColor}
        />
      </div>
    </div>
  );
};

EventGuestListItem.propTypes = {
  dispatch: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  guestListId: PropTypes.string,
  guestLists: PropTypes.arrayOf(PropTypes.object),
};

export default connect(({ guestLists }) => ({ guestLists }))(EventGuestListItem);
