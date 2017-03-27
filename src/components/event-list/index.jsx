import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchEvents } from '~/src/toakee-core/ducks/events';
import EventListItem from './item';

if (process.env.BROWSER) {
  require('./style.scss');
}

class EventList extends React.Component {
  componentWillMount() {
    const { start, end } = this.props;
    this.props.dispatch(fetchEvents({ start, end }));
  }

  render() {
    const { title, events, start, end } = this.props;
    const list = events.get('data').size
      ? events.get('data')
          .filter(e => start.isSameOrBefore(e.start) && (!end || end.isSameOrAfter(e.start)))
          .sort((a, b) => a.start > b.start)
          .toArray()
      : [];

    declare var event;
    declare var idx;

    return !!list.length && (
      <div className="EventList">
        <div className="EventList-title">{title}</div>
        <div className="EventList-list">
          <For each="event" index="idx" of={list}>
            <EventListItem key={idx} {...event} />
          </For>
        </div>
      </div>
    );
  }
}

EventList.propTypes = {
  title: PropTypes.string,
  events: PropTypes.object,
  start: PropTypes.object,
  end: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  ({ events }) => ({ events }),
)(EventList);
