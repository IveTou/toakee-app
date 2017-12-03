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

const ManageEvent = ({ viewer = {}, loadMore, loading }) => {
  const { events = [] } = viewer;

  return (
    <DefaultLayout hideFooter>
      <div className="ManageEvent">
      </div>
    </DefaultLayout>
  );
};

export default graphql(query, {
  options: ({ match }) => ({
    variables: { eventId: match.params.id },
  }),
  props: ({ data: { event } }) => ({ event }),
})(ManageEvent);
