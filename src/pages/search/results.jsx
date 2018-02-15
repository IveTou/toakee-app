import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Card } from 'semantic-ui-react';

import EventCard from '~/src/components/event-card';

import { query } from './graphql';

declare var event;

const SearchPageResults = ({ title, loading, nextEvents, previousEvents }) => (
  <div className="SearchPageResults">
    <h3 className="SearchPageResults-title">{title}</h3>
    <Choose>
      <When condition={!loading && nextEvents && nextEvents.length}>
        <Card.Group>
          <For each="event" of={nextEvents}>
            <EventCard key={event.id} event={event} />
          </For>
        </Card.Group>
      </When>
      <When condition={!loading}>
        <div className="SearchPageResults-notFound">
          <div className="SearchPageResults-notFound-shrug">¯\_(ツ)_/¯</div>
          <div className="SearchPageResults-notFound-separator" />
          <div className="SearchPageResults-notFound-text">
            Não encontramos eventos que ainda vão acontecer com esse nome.
          </div>
        </div>
      </When>
    </Choose>
    <If condition={previousEvents && previousEvents.length}>
      <h3 className="SearchPageResults-title">Eventos anteriores</h3>
      <Card.Group>
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
};

export default graphql(query, {
  options: ({ q, start, end }) => ({
    variables: { query: q || '', start, end },
  }),
  props: ({ data: { nextEvents, previousEvents, loading } }) => ({
    nextEvents,
    previousEvents,
    loading,
  }),
})(SearchPageResults);
