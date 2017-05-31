import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { toggleDashboard } from '~/src/toakee-core/ducks/dashboard';
import DashboardMenuItem from './menu-item';

declare var event;

const DashboardMenu = ({ events, open, toggle, selectedEvent = {} }) => (
  <div className={`DashboardMenu${open ? ' DashboardMenu-open' : ''}`}>
    <div className="DashboardMenu-header">
      <Icon className="DashboardMenu-header-icon" name="sidebar" onClick={toggle} />
      <span className="DashboardMenu-header-title">Gerenciar eventos</span>
    </div>
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
  open: PropTypes.bool,
  toggle: PropTypes.func,
};

export default connect(
  ({ dashboard }) => ({ open: dashboard.get('open') }),
  dispatch => ({ toggle: () => dispatch(toggleDashboard()) }),
)(DashboardMenu);
