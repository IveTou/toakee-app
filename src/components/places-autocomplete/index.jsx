import React from 'react';
import { map } from 'lodash';

import AutoComplete from '~/src/components/autocomplete';
import apolloClient from '~/src/apollo';

import { searchPlace } from './graphql';

const placeMapper = p => ({ primary: p.name, secondary: p.address, value: p });
const newPlace = { primary: 'Adicionar novo' };

const fetchPlaces = query => (
  apolloClient.query({ query: searchPlace, variables: { query, limit: 5 } })
    .then(result => map(result.data.places, placeMapper).concat([newPlace]))
);

const PlacesAutocomplete = props => (
  <AutoComplete onSearch={fetchPlaces} {...props} />
);

export default PlacesAutocomplete;
