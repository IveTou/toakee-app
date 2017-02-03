import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import moment from 'moment';

import EventList from '~/src/components/event-list';
import EventListContainer from '~/src/components/event-list/container';

const EventBox = ({ viewer }) => (
  <div className="EventBox">
    <EventList
      viewer={viewer}
      title="Hoje"
      start={moment().startOf('day')}
      end={moment().endOf('day')}
    />
    <EventList
      viewer={viewer}
      title="Amanhã"
      start={moment().add(1, 'days').startOf('day')}
      end={moment().add(1, 'days').endOf('day')}
    />
    <EventList
      viewer={viewer}
      title="Nesta semana"
      start={moment().add(2, 'days').startOf('day')}
      end={moment().add(2, 'days').endOf('week')}
    />
    <EventList
      viewer={viewer}
      title="Eventos futuros"
      start={moment().add(2, 'days').endOf('week').add(1, 'days')}
      end={moment().add(2, 'days').endOf('year')}
    />
  </div>
);

EventBox.propTypes = {
  viewer: PropTypes.object.isRequired,
};

export default Relay.createContainer(EventBox, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Profile {
        ${EventListContainer.getFragment('viewer')}
      }
    `,
  },
});
