import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import autoBind from 'react-autobind';
import VisibilitySensor from 'react-visibility-sensor';
import { range } from 'lodash';
import { compose } from 'recompose';
import { Typography } from 'material-ui';

import { ease } from '~/src/utils/animation';
import EventCard from '~/src/components/event-card';
import EventCardPlaceholder from '~/src/components/event-card/placeholder';

import EventListArrow from './arrow';
import { query } from './graphql';
import { withIndexStyle } from './styles';

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
    const { classes, title, viewer = {}, vertical, excludedEventId } = this.props;
    const { eventCount } = viewer;
    const events = viewer.events ? viewer.events.filter(e => e.id !== excludedEventId) : [];

    const node = this._listDOM || {};
    const arrows = vertical ? ['up', 'down'] : ['left', 'right'];
    const hideLeftArrow = !node.scrollLeft;
    const hideRightArrow =
      (node.scrollLeft + node.offsetWidth) >= node.scrollWidth && !this.state.hasMore;

    declare var event;
    declare var placeholder;
    declare var idx;


    return !!eventCount && (
      <div>
        <If condition={title}>
          <Typography className={classes.title} variant="title">{title} ({eventCount})</Typography>
        </If>
        <div className={classes.listWrapper}>
          <EventListArrow
            direction={arrows[0]}
            onClick={() => this.scroll(-1)}
            hide={hideLeftArrow}
          />
          <EventListArrow
            direction={arrows[1]}
            onClick={() => this.scroll(1)}
            hide={hideRightArrow}
          />
          <div ref={(dom) => { this._listDOM = dom; }} className={classes.list}>
            <For each="event" index="idx" of={events}>
              <EventCard className={classes.listItem} key={idx} event={event} />
            </For>
            <If condition={this.state.hasMore}>
              <VisibilitySensor onChange={isVisible => (isVisible && this.fetchEvents())} />
              <For each="placeholder" of={range(Math.min(5, eventCount - events.length))}>
                <EventCardPlaceholder key={placeholder} className={classes.listItem} />
              </For>
            </If>
          </div>
        </div>
      </div>
    );
  }
}

EventList.propTypes = {
  title: PropTypes.string,
  loadMore: PropTypes.func,
  vertical: PropTypes.bool,
  excludedEventId: PropTypes.string,
  viewer: PropTypes.object,
  classes: PropTypes.object,
};

const injectQuery = graphql(query, {
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
});

export default compose(
  injectQuery,
  withIndexStyle,
)(EventList);
