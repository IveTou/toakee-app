import { omit } from 'lodash';

export const omitTypenames =
  list => list.map(i => omit(i, ['__typename']));
