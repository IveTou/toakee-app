import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Card } from 'semantic-ui-react';

import EventCard from '~/src/components/event-card';

import query from './graphql';

declare var event;

const SearchPageResults = ({ loading, title, search, hideOnEmpty }) => (
  <div className="SearchPageResults">
    <If condition={!hideOnEmpty || search && search.length}>
      <h3 className="SearchPageResults-title">{title}</h3>
    </If>
    <Choose>
      <When condition={search && search.length}>
        <Card.Group>
          <For each="event" of={search || []}>
            <EventCard key={event.id} event={event} />
          </For>
        </Card.Group>
      </When>
      <When condition={!loading && !hideOnEmpty}>
        <div className="SearchPageResults-notFound">
          <div className="SearchPageResults-notFound-shrug">¯\_(ツ)_/¯</div>
          <div className="SearchPageResults-notFound-separator"></div>
          <div className="SearchPageResults-notFound-text">
            Não encontramos nenhum evento com esse nome.
          </div>
        </div>
      </When>
    </Choose>
  </div>
);

SearchPageResults.propTypes = {
  title: PropTypes.string,
  search: PropTypes.array,
  hideOnEmpty: PropTypes.boolean,
};

export default graphql(query, {
  options: ({ query: _query, start, end }) => ({
    variables: { query: _query, start, end },
  }),
  props: ({ data: { search, loading } }) => ({ search, loading }),
})(SearchPageResults);
