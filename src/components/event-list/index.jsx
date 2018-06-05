import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { graphql } from 'react-apollo';
import autoBind from 'react-autobind';
import VisibilitySensor from 'react-visibility-sensor';
import { range } from 'lodash';
import { compose } from 'recompose';
import { Divider, Typography } from 'material-ui';

import { ease } from '~/src/utils/animation';
import EventCard from '~/src/components/event-card';
import EventCardPlaceholder from '~/src/components/event-card/placeholder';

import EventListArrow from './arrow';
import { query } from './graphql';
import { withIndexStyle } from './styles';

const FEED_LIMIT = 5;

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
    const { classes, title, viewer = {}, vertical, counter, getCount } = this.props;
    const { eventCount, events = [] } = viewer;

    const listClasses = classNames(classes.list, vertical && classes.listVertical);

    const node = this._listDOM || {};
    const hideLeftArrow = !node.scrollLeft;
    const hideRightArrow =
      (node.scrollLeft + node.offsetWidth) >= node.scrollWidth && !this.state.hasMore;

    declare var event;
    declare var placeholder;
    declare var idx;

    return !!eventCount && (
      <div onClick={() => getCount(eventCount)}>
        <If condition={eventCount && title}>
          <Typography className={classes.title} variant="title">
            {title}
            <If condition={counter}> ({vertical ? events.length : eventCount})</If>
          </Typography>
        </If>
        <div className={classes.listWrapper}>
          <If condition={!vertical}>
            <EventListArrow
              direction="left"
              onClick={() => this.scroll(-1)}
              hide={hideLeftArrow}
            />
            <EventListArrow
              direction="right"
              onClick={() => this.scroll(1)}
              hide={hideRightArrow}
            />
          </If>
          <div ref={(dom) => { this._listDOM = dom; }} className={listClasses}>
            <For each="event" index="idx" of={events}>
              <div key={idx}>
                <EventCard event={event} />
                <If condition={vertical && events.length > 1}><Divider light /></If>
              </div>
            </For>
            <If condition={this.state.hasMore && (!vertical || !events.length)}>
              <VisibilitySensor onChange={isVisible => (isVisible && this.fetchEvents())} />
              <For each="placeholder" of={range(Math.min(5, eventCount - events.length))}>
                <EventCardPlaceholder key={placeholder} />
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
  getCount: PropTypes.func,
  vertical: PropTypes.bool,
  viewer: PropTypes.object,
  classes: PropTypes.object,
  counter: PropTypes.bool,
};

const injectQuery = graphql(query, {
  options: ({
    start, end, categoryIds, strict, forceFetch, has, sort, limit = FEED_LIMIT, relatedTo, status = 'ACTIVE',
  }) => ({
    variables: {
      start,
      end,
      skip: 0,
      categoryIds,
      limit,
      strict,
      status,
      has,
      relatedTo,
      sort,
      skipList: !forceFetch,
      skipCount: false,
    },
  }),
  props: ({
    data: { viewer, fetchMore },
    ownProps: { categoryIds, start, sort, has, relatedTo },
  }) => ({
    viewer,
    loadMore: () => {
      const { events = [] } = viewer;

      const skip = events.length;
      const strict = !!events.length;
      const skipCount = true;
      const skipList = false;

      return fetchMore({
        variables: { start, categoryIds, sort, has, relatedTo, skip, strict, skipCount, skipList },
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
