import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import autoBind from 'react-autobind';
import VisibilitySensor from 'react-visibility-sensor';

import { ease } from '~/src/utils/animation';
import EventListItem from './item';
import EventListArrow from './arrow';
import query from './graphql';

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
    declare var idx;
    return !!events.length && (
      <div className="EventList">
        <div className="EventList-title">{title} ({eventCount})</div>
        <div className="EventList-list" ref={(dom) => { this._listDOM = dom; }}>
          <EventListArrow direction="left" onClick={() => this.scroll(-1)} hide={hideLeftArrow} />
          <EventListArrow direction="right" onClick={() => this.scroll(1)} hide={hideRightArrow} />
          <For each="event" index="idx" of={events}>
            <EventListItem key={idx} {...event} />
          </For>
          <If condition={this.state.hasMore}>
            <VisibilitySensor onChange={isVisible => (isVisible && this.fetchEvents())} />
          </If>
          <div className="EventList-list-end" />
        </div>
      </div>
    );
  }
}

EventList.propTypes = {
  title: PropTypes.string,
  loadMore: PropTypes.func,
  viewer: PropTypes.object,
};

export default graphql(query, {
  options: ({ start, end, categoryIds }) => ({
    variables: { start, end, skip: 0, categoryIds, limit: FEED_LIMIT },
  }),
  props: ({ data: { viewer, fetchMore }, ownProps: { categoryIds } }) => ({
    viewer,
    loadMore: () => {
      const start = new Date(viewer.events[viewer.events.length - 1].start);
      const skip = viewer.events
        .filter(e => start.getTime() === new Date(e.start).getTime())
        .length;

      return fetchMore({
        variables: { start: viewer.events[viewer.events.length - 1].start, categoryIds, skip },
        updateQuery: (previousResult, { fetchMoreResult }) => (
          !fetchMoreResult
            ? previousResult
            : {
              viewer: {
                ...previousResult.viewer,
                events: [
                  ...previousResult.viewer.events,
                  ...fetchMoreResult.viewer.events,
                ],
              },
            }
        ),
      });
    },
  }),
})(EventList);
