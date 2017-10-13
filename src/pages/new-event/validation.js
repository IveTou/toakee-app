import validate from 'validate.js';
import moment from 'moment';
import { includes } from 'lodash';

validate.extend(validate.validators.datetime, {
  parse: value => value,
  format: (value, options) => {
    const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm';
    return value.format(format);
  },
});

validate.validators.file = (value = {}, options) => (
  (options.format || options) === 'image' && !includes(value.type, 'image')
    ? options.message || 'has to be an image'
    : null
);

validate.validators.prices = (values = []) => (
  values.reduce((errors, v, i) => (
    (!v.value || !v.description)
      ? {
        ...errors,
        [`${i}:value`]: !v.value && ['Favor preencher o valor'],
        [`${i}:description`]: !v.description && ['Favor preencher a descrição'],
      } : errors
  ), {}) || null
);

validate.validators.presence.options = { message: 'Favor preencher este campo.' };
validate.options = { fullMessages: false };

const presence = true;

export const validateNewEvent = obj => validate(obj, {
  flyer: {
    presence,
    file: { format: 'image', message: 'O flyer precisa ser uma imagem.' },
  },
  title: { presence },
  place: { presence },
  prices: prices => ({ prices: prices && prices.length > 1 }),
  start: {
    presence,
    datetime: {
      earliest: moment(),
      message: 'Ainda não cadastramos eventos que já ocorreram.',
    },
  },
  end: (_, { start }) => ({
    presence,
    datetime: {
      earliest: start,
      message: 'O fim do evento precisa ser depois do início.',
    },
  }),
});
