import { upperFirst, map } from 'lodash';
import { Map } from 'immutable';

export const buildMutationQuery = (name, args, returnQuery = '') => (`
  mutation ${upperFirst(name)}(${map(args, (value, key) => (`$${key}: ${value}`)).join(', ')}) {
    ${name}(${map(args, (_, key) => (`${key}: $${key}`)).join(', ')})
    ${returnQuery}
  }
`);

export const fetchableState = extra => Map({
  fetching: false,
  fetched: false,
  data: Map({}),
  ...extra,
});

export const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
