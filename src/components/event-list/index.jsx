import React from 'react';
import PropTypes from 'prop-types';
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
    const { title, viewer = {} } = this.props;
    const { events = [], eventCount } = viewer;

    const node = this._listDOM || {};
    const hideLeftArrow = !node.scrollLeft;
    const hideRightArrow =
      node.scrollLeft + node.offsetWidth >= node.scrollWidth
      && !this.state.hasMore;

    declare var event;
    declare var placeholder;
    declare var idx;
    return !!eventCount && (
      <div className="EventList">
        <div className="EventList-title">{title} ({eventCount})</div>
        <div className="EventList-list" ref={(dom) => { this._listDOM = dom; }}>
          <EventListArrow direction="left" onClick={() => this.scroll(-1)} hide={hideLeftArrow} />
          <EventListArrow direction="right" onClick={() => this.scroll(1)} hide={hideRightArrow} />
          <For each="event" index="idx" of={events}>
            <EventCard key={idx} event={event} />
          </For>
          <If condition={this.state.hasMore}>
            <VisibilitySensor onChange={isVisible => (isVisible && this.fetchEvents())} />
            <For each="placeholder" of={range(Math.min(5, eventCount - events.length))}>
              <EventCardPlaceholder key={placeholder} />
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
  viewer: PropTypes.object,
  discountLists: PropTypes.arrayOf(PropTypes.object),
};

export default graphql(query, {
  options: ({
    start, end, categoryIds, strict, forceFetch, has, sort, status = 'ACTIVE',
  }) => ({
    variables: {
      start,
      end,
      skip: 0,
      categoryIds,
      limit: FEED_LIMIT,
      strict,
      status,
      has,
      sort,
      skipList: !forceFetch,
      skipCount: false,
    },
  }),
  props: ({
    data: { viewer, fetchMore },
    ownProps: { categoryIds, start, sort, has },
  }) => ({
    viewer,
    loadMore: () => {
      const { events = [] } = viewer;

      const skip = events.length;
      const strict = !!events.length;
      const skipCount = true;
      const skipList = false;

      return fetchMore({
        variables: { start, categoryIds, sort, has, skip, strict, skipCount, skipList },
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
