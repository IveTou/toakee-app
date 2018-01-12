import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { graphql } from 'react-apollo';
import autoBind from 'react-autobind';
import VisibilitySensor from 'react-visibility-sensor';
import { range } from 'lodash';

import { ease } from '~/src/utils/animation';
import EventCard from '~/src/components/event-card';
import EventCardPlaceholder from '~/src/components/event-card/placeholder';

import EventListArrow from './arrow';
import { query } from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

const FEED_LIMIT = 10;

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasMore: true, fetchingMore: false };
    autoBind(this);
  }

  fetchEvents() {
    if (!this.state.fetchingMore) {
      this.setState({ fetchingMore: true }, () => {
        this.props.loadMore().then(({ data: { viewer } }) => {
          this.setState({
            fetchingMore: false,
            hasMore: !(viewer && viewer.events && !viewer.events.length),
          });
        });
      });
    }
  }

  scroll(direction) {
    const node = this._listDOM;
    const startingPoint = node.scrollLeft;
    const amount = node.offsetWidth * 0.8 * direction;

    ease(500, (tweaker) => {
      node.scrollLeft = startingPoint + (tweaker * amount);
    }, () => this.forceUpdate());
  }

  render() {
    const { title, viewer = {}, vertical } = this.props;
    const { events = [], eventCount } = viewer;

    const node = this._listDOM || {};
    const hideLeftArrow = !node.scrollLeft || vertical;
    const hideRightArrow =
      node.scrollLeft + node.offsetWidth >= node.scrollWidth
      && !this.state.hasMore || vertical;

    const classes = classNames('EventList', { 'EventList--vertical': vertical });

    declare var event;
    declare var placeholder;
    declare var idx;

    return !!eventCount && (
      <div className={classes}>
        <div className="EventList-title">{title} ({eventCount})</div>
        <div className="EventList-list" ref={(dom) => { this._listDOM = dom; }}>
          <EventListArrow direction="left" onClick={() => this.scroll(-1)} hide={hideLeftArrow} />
          <EventListArrow direction="right" onClick={() => this.scroll(1)} hide={hideRightArrow} />
          <For each="event" index="idx" of={events}>
            <EventCard key={idx} event={event} vertical={vertical} />
          </For>
          <If condition={this.state.hasMore}>
            <VisibilitySensor onChange={isVisible => (isVisible && this.fetchEvents())} />
            <For each="placeholder" of={range(Math.min(5, eventCount - events.length))}>
              <EventCardPlaceholder key={placeholder} vertical={vertical} />
            </For>
          </If>
        </div>
      </div>
    );
  }
}

EventList.propTypes = {
  title: PropTypes.string,
  loadMore: PropTypes.func,
  vertical: PropTypes.bool,
  viewer: PropTypes.object,
};

export default graphql(query, {
  options: ({ start, end, categoryIds, strict, forceFetch, status = 'ACTIVE' }) => ({
    variables: {
      start,
      end,
      skip: 0,
      categoryIds,
      limit: FEED_LIMIT,
      strict,
      status,
      skipList: !forceFetch,
      skipCount: false,
    },
  }),
  props: ({ data: { viewer, fetchMore }, ownProps: { categoryIds, start: _start } }) => ({
    viewer,
    loadMore: () => {
      const { events = [] } = viewer;
      const eventStart = events.length && new Date(events[events.length - 1].start);
      const start = (eventStart && _start.isBefore(eventStart))
        ? eventStart
        : _start;

      const skip = events.length && events
        .filter(e => eventStart.getTime() === new Date(e.start).getTime())
        .length;

      const strict = !!events.length;
      const skipCount = true;
      const skipList = false;

      return fetchMore({
        variables: { start, categoryIds, skip, strict, skipCount, skipList },
        updateQuery: (previousResult, { fetchMoreResult }) => (
          !fetchMoreResult
            ? previousResult
            : {
              viewer: {
                ...previousResult.viewer,
                events: [
                  ...(previousResult.viewer.events || []),
                  ...fetchMoreResult.viewer.events,
                ],
              },
            }
        ),
      });
    },
  }),
})(EventList);
