import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';

import { toggleDashboard } from '~/src/ducks/dashboard';

import DashboardMenuItem from './menu-item';
import { dashboardMenuQuery } from './graphql';

declare var event;

const DashboardMenu = ({ viewer = {}, open, toggle, match }) => (
  <div className={`DashboardMenu${open ? ' DashboardMenu-open' : ''}`}>
    <div className="DashboardMenu-header">
      <Icon className="DashboardMenu-header-icon" name="sidebar" onClick={toggle} />
      <span className="DashboardMenu-header-title">Gerenciar eventos</span>
    </div>
    <div className="DashboardMenu-events">
      <For each="event" of={viewer.events || []}>
        <DashboardMenuItem
          key={event.id}
          open={match.params.id === event.id}
          {...event}
        />
      </For>
    </div>
  </div>
);

DashboardMenu.propTypes = {
  viewer: PropTypes.object,
  match: PropTypes.object,
  open: PropTypes.bool,
  toggle: PropTypes.func,
};

const DashboardMenuWithData = graphql(dashboardMenuQuery, {
  options: () => ({
    variables: { start: moment() },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
})(DashboardMenu);

export default connect(
  ({ dashboard }) => ({ open: dashboard.get('open') }),
  dispatch => ({ toggle: () => dispatch(toggleDashboard()) }),
)(DashboardMenuWithData);
