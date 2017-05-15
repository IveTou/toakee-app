import React, { PropTypes } from 'react';
import DashboardMenuItem from './menu-item';

declare var event;

const DashboardMenu = ({ events, selectedEvent = {} }) => (
  <div className="DashboardMenu">
    <div className="DashboardMenu-header">Gerenciar eventos</div>
    <div className="DashboardMenu-events">
      <For each="event" of={events}>
        <DashboardMenuItem
          key={event.id}
          open={selectedEvent.id === event.id}
          {...event}
        />
      </For>
    </div>
  </div>
);

DashboardMenu.propTypes = {
  selectedEvent: PropTypes.object,
  events: PropTypes.array,
};

export default DashboardMenu;
