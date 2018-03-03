import React from 'react';
import PropTypes from 'prop-types';
import { chain } from 'lodash';

import EventGuestListItem from './item';

declare var idx;
declare var invitation;

const EventGuestListList = ({ toggleAttendanceStatus, invitations = [], filter }) => {
  const filterRegex = new RegExp(
    `\\b${filter.trim().replace(/\s+/, '[\\s\\S]*\\s')}`,
    'i',
  );

  const list = chain(invitations)
    .filter(({ normalizedName }) => normalizedName.match(filterRegex))
    .sortBy([({ normalizedName: n }) => n.match(filterRegex).index, 'normalizedName'])
    .value();

  return (
    <div className="EventGuestListList">
      <For each="invitation" index="idx" of={list}>
        <EventGuestListItem
          key={idx}
          invitation={invitation}
          shadow={list[idx + 1] && list[idx + 1].status === 'INVITED'}
          onChangeStatus={() => toggleAttendanceStatus(invitation)}
        />
      </For>
    </div>
  );
};

EventGuestListList.propTypes = {
  invitations: PropTypes.array,
  filter: PropTypes.string,
  toggleAttendanceStatus: PropTypes.func,
};

export default EventGuestListList;
