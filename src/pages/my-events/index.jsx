import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { List, ListItem, Divider, Avatar, Paper } from 'material-ui';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';

import DefaultLayout from '~/src/layouts/default';

import query from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

const MyEvents = ({ viewer = {}, loadMore, loading }) => {
  const { events = [] } = viewer;

  return (
    <DefaultLayout hideFooter>
      <div className="MyEvents">
        <div className="MyEvents-section">
          <h3 className="MyEvents-section-title">Criados por mim</h3>
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
    </DefaultLayout>
  );
};

export default graphql(query, {
  options: () => ({
    variables: { start: moment(), limit: 2 },
  }),
  props: ({ data: { viewer, fetchMore, loading } }) => ({
    loading,
    viewer,
    loadMore: () => {
      const { events = [] } = viewer;
      const start = events.length && new Date(events[events.length - 1].start);

      const skip = events.length && events
        .filter(e => start.getTime() === new Date(e.start).getTime())
        .length;

      console.log({ start, skip });

      return fetchMore({
        variables: { start, skip, strict: true },
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
