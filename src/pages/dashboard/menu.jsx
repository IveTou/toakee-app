import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';
import { get } from 'lodash';
import VisibilitySensor from 'react-visibility-sensor';
import { CircularProgress } from 'material-ui';

import { toggleDashboard } from '~/src/ducks/dashboard';

import DashboardMenuItem from './menu-item';
import { dashboardMenuQuery } from './graphql';

declare var event;

class DashboardMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingMore: false,
      hasMore: true,
    };
  }

  loadMore() {
    if (!this.state.fetchingMore) {
      this.setState({ fetchingMore: true }, async () => {
        const { data } = await this.props.loadMore();
        this.setState({
          fetchingMore: false,
          hasMore: !!get(data, 'viewer.events.length'),
        });
      });
    }
  }

  render() {
    const { open, toggle, match, events, loading } = this.props;

    return (
      <div className={`DashboardMenu${open ? ' DashboardMenu-open' : ''}`}>
        <div className="DashboardMenu-header">
          <Icon className="DashboardMenu-header-icon" name="sidebar" onClick={toggle} />
          <span className="DashboardMenu-header-title">Gerenciar eventos</span>
        </div>
        <div className="DashboardMenu-events">
          <For each="event" of={events}>
            <DashboardMenuItem
              key={event.id}
              open={match.params.id === event.id}
              {...event}
            />
          </For>
          <If condition={this.state.hasMore}>
            <If condition={!loading}>
              <VisibilitySensor
                onChange={isVisible => (isVisible && this.loadMore())}
              />
            </If>
            <div className="DashboardMenu-events-spinner">
              <CircularProgress />
            </div>
          </If>
        </div>
      </div>
    );
  }
}

DashboardMenu.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  toggle: PropTypes.func,
  loadMore: PropTypes.func,
};

const DashboardMenuWithData = props => (
  <Query
    query={dashboardMenuQuery}
    variables={{ start: moment().startOf('day') }}
  >
    {({ loading, fetchMore, data }) => (
      <DashboardMenu
        {...props}
        events={get(data, 'viewer.events', [])}
        loading={loading}
        loadMore={() => fetchMore({
          variables: { skip: get(data, 'viewer.events.length', 0) },
          updateQuery: (previousResult, { fetchMoreResult }) => ({
            viewer: {
              ...previousResult.viewer,
              events: [
                ...get(previousResult, 'viewer.events', []),
                ...get(fetchMoreResult, 'viewer.events', []),
              ],
            }
          }),
        })}
      />
    )}
  </Query>
);

export default connect(
  ({ dashboard }) => ({ open: dashboard.get('open') }),
  dispatch => ({ toggle: () => dispatch(toggleDashboard()) }),
)(DashboardMenuWithData);
