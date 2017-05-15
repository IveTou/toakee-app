import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchEvents } from '~/src/toakee-core/ducks/events';

import DashboardMenu from './menu';
import DashboardContent from './content';

if (process.env.BROWSER) {
  require('./style.scss');
}

const FEED_LIMIT = 10;

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchEvents({ onlyMine: true, limit: FEED_LIMIT }));
  }

  render() {
    const { children, events, router } = this.props;
    const selectedEvent = events.find(e => e.slug === router.params.slug);

    return (
      <div className="Dashboard">
        <DashboardMenu events={events} selectedEvent={selectedEvent} />
        <DashboardContent selectedEvent={selectedEvent} content={children} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  children: PropTypes.any,
  events: PropTypes.array,
  router: PropTypes.object,
};

export default connect(({ events, viewer }) => {
  const profileId = viewer.get('data').get('id');
  return {
    events: events
      .get('data')
      .filter(e => profileId && (e.members || []).some(m => m.profileId === profileId))
      .sort((a, b) => a.start - b.start)
      .toArray(),
  };
})(Dashboard);
