import React from 'react';
import { map, capitalize } from 'lodash';

import apolloClient from '~/src/apollo';
import AutoComplete from '~/src/components/autocomplete';

import { searchCategory } from './graphql';

const categoryMapper = p => ({ primary: p.title, value: p });
const newCategory = query => {
  const title = capitalize(query);
  return { primary: `Adicionar: ${title}`, value: { title } };
};

const fetchCategories = query =>
  apolloClient.query({ query: searchCategory, variables: { query, limit: 5 } })
    .then(({ data }) =>
      map(data.categories, categoryMapper).concat([newCategory(query)])
    );

const CategoriesAutocomplete = props => (
  <AutoComplete onSearch={fetchCategories} {...props} />
);

export default CategoriesAutocomplete;
