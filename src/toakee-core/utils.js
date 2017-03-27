import { upperFirst, map } from 'lodash';
import { Map } from 'immutable';

export const buildMutationQuery = (name, args) => (`
  mutation ${upperFirst(name)}(${map(args, (value, key) => (`$${key}: ${value}`)).join(', ')}) {
    ${name}(${map(args, (_, key) => (`${key}: $${key}`)).join(', ')})
  }
`);

export const fetchableState = extra => Map({
  fetching: false,
  fetched: false,
  data: Map({}),
  ...extra,
});
