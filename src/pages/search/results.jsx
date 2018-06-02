import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Card } from 'semantic-ui-react';
import { Typography } from 'material-ui';

import EventCard from '~/src/components/event-card';

import { withIndexStyle } from './styles';
import { query } from './graphql';

declare var event;

const SearchPageResults = ({ title, loading, nextEvents, previousEvents, classes }) => (
  <div className={classes.root}>
    <Typography variant="headline" color="inherit" gutterBottom>
      {title || `Resultados`}
    </Typography>
    <Choose>
      <When condition={!loading && nextEvents && nextEvents.length}>
        <Card.Group className={classes.eventBox}>
          <For each="event" of={nextEvents}>
            <EventCard key={event.id} event={event} />
          </For>
        </Card.Group>
      </When>
      <When condition={!loading}>
        <div className={classes.notFound}>
          <Typography className={classes.shrug} variant="display1" color="primary">
            ¯\_(ツ)_/¯
          </Typography>
          <Typography className={classes.message} variant="title">
            Não encontramos eventos que ainda vão acontecer com esse nome.
          </Typography>
        </div>
      </When>
    </Choose>
    <If condition={previousEvents && previousEvents.length}>
      <Typography variant="headline" color="inherit" gutterBottom>Eventos anteriores</Typography>
      <Card.Group className={classes.eventBox}>
        <For each="event" of={previousEvents}>
          <EventCard key={event.id} event={event} />
        </For>
      </Card.Group>
    </If>
  </div>
);

SearchPageResults.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  nextEvents: PropTypes.array,
  previousEvents: PropTypes.array,
  classes: PropTypes.object,
};

const injectData = graphql(query, {
  options: ({ q, start, end }) => ({
    variables: { query: q || '', start, end },
  }),
  props: ({ data: { nextEvents, previousEvents, loading } }) => ({
    nextEvents,
    previousEvents,
    loading,
  }),
});

export default compose(
  injectData,
  withIndexStyle,
)(SearchPageResults);
