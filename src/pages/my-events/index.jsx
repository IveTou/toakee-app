import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { List, ListItem, Divider, Avatar } from 'material-ui';
import moment from 'moment';

import DefaultLayout from '~/src/layouts/default';

import query from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

const MyEvents = ({ viewer = {} }) => {
  const { events = [] } = viewer;

  return (
    <DefaultLayout hideFooter>
      <div className="MyEvents">
        <List>
          <For each="event" of={events} index="idx">
            <ListItem
              leftAvatar={<Avatar src={event.flyer} />}
              primaryText={event.title}
              secondaryText={moment(event.start).format('DD/MM')}
            />
            <Divider inset={true} />
          </For>
        </List>
      </div>
    </DefaultLayout>
  );
};

export default graphql(query, {
  options: () => ({
    variables: { start: moment() },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
})(MyEvents);
