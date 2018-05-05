import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { List, ListItem, Divider, Avatar, Paper } from 'material-ui';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';

import query from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

const MyEvents = ({ viewer = {}, loadMore, loading }) => {
  const { events = [] } = viewer;

  return (
    <div className="MyEvents">
      <div className="MyEvents-section">
        <h3 className="MyEvents-section-title">Meus eventos</h3>
        <Paper>
          <List className="MyEvents-section-list">
            <For each="event" of={events} index="idx">
              <ListItem
                leftAvatar={<Avatar src={event.flyer} />}
                primaryText={event.title}
                secondaryText={moment(event.start).format('DD/MM')}
              />
              <If condition={idx < events.length - 1}>
                <Divider />
              </If>
            </For>
            <If condition={!loading}>
              <VisibilitySensor onChange={isVisible => (isVisible && loadMore())} />
            </If>
          </List>
        </Paper>
      </div>
    </div>
  );
};

MyEvents.propTypes = {
  viewer: PropTypes.object,
  loadMore: PropTypes.func,
  loading: PropTypes.bool,
};

export default graphql(query, {
  options: () => ({
    variables: { start: moment().startOf('day'), limit: 2 },
  }),
  props: ({ data: { viewer, fetchMore, loading } }) => ({
    loading,
    viewer,
    loadMore: () => {
      const { events = [] } = viewer;

      return fetchMore({
        variables: { skip: events.length, strict: true },
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
})(MyEvents);
