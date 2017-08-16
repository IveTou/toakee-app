import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Card } from 'semantic-ui-react';

import EventCard from '~/src/components/event-card';

import query from './graphql';

declare var event;

const SearchPageResults = ({ title, search }) => (
  <div className="SearchPageResults">
    <h3 className="SearchPageResults-title">{title}</h3>
    <Card.Group>
      <For each="event" of={search || []}>
        <EventCard key={event.id} event={event} />
      </For>
    </Card.Group>
  </div>
);

SearchPageResults.propTypes = {
  title: PropTypes.string,
  search: PropTypes.array,
};

export default graphql(query, {
  options: ({ query: _query, start, end }) => ({
    variables: { query: _query, start, end },
  }),
  props: ({ data: { search } }) => ({ search }),
})(SearchPageResults);
