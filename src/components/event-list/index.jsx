import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import VisibilitySensor from 'react-visibility-sensor';

import { ease } from '~/src/utils/animation';
import { fetchEvents } from '~/src/toakee-core/ducks/events';
import EventListItem from './item';
import EventListArrow from './arrow';

if (process.env.BROWSER) {
  require('./style.scss');
}

const FEED_LIMIT = 10;

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastEventId: null };
    autoBind(this);
  }

  componentWillMount() {
    const { start, end } = this.props;
    this.props.dispatch(fetchEvents({ start, end, limit: FEED_LIMIT }));
  }

  fetchEvents() {
    const { events, end } = this.props;
    const lastEvent = events[events.length - 1];
    if (this.state.lastEventId !== lastEvent.id) {
      this.setState({
        lastEventId: lastEvent.id,
      }, () => {
        const { start } = lastEvent;
        const skip = events.filter(e => e.start.getTime() === start.getTime()).length;
        this.props.dispatch(fetchEvents({ start, end, skip, limit: FEED_LIMIT }));
      });
    }
  }

  scroll(direction) {
    const node = this._listDOM;
    const startingPoint = node.scrollLeft;
    const amount = node.offsetWidth * 0.8 * direction;

    ease(500, (tweaker) => {
      node.scrollLeft = startingPoint + (tweaker * amount);
    });
  }

  render() {
    const { title, events } = this.props;
    declare var event;
    declare var idx;
    return !!events.length && (
      <div className="EventList">
        <div className="EventList-title">{title}</div>
        <div className="EventList-list" ref={(node) => { this._listDOM = node; }}>
          <EventListArrow direction="left" onClick={() => this.scroll(-1)} />
          <EventListArrow direction="right" onClick={() => this.scroll(1)} />
          <For each="event" index="idx" of={events}>
            <EventListItem key={idx} {...event} />
          </For>
          <VisibilitySensor onChange={isVisible => (isVisible && this.fetchEvents())} />
          <div className="EventList-list-end" />
        </div>
      </div>
    );
  }
}

EventList.propTypes = {
  title: PropTypes.string,
  events: PropTypes.array,
  start: PropTypes.object,
  end: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(({ events }, { start, end }) => ({
  events: events
    .get('data')
    .filter(e => start.isSameOrBefore(e.start) && (!end || end.isSameOrAfter(e.start)))
    .sort((a, b) => a.start - b.start)
    .toArray(),
}))(EventList);
