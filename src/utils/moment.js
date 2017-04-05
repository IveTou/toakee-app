import { upperFirst } from 'lodash';
import moment from 'moment';

export const dateTimeFormat = (time) => {
  if (moment().endOf('week').isBefore(time)) {
    return moment(time).format('DD/MM (ddd)');
  } else if (moment().add(1, 'day').endOf('day').isBefore(time)) {
    return moment(time).format('dddd HH:mm');
  } else if (moment().endOf('day').isBefore(time)) {
    return moment(time).format('[Amanhã] HH:mm');
  } else if (moment().add(2, 'hours').isBefore(time)) {
    return moment(time).format('[Hoje] HH:mm');
  } else if (moment().isBefore(time)) {
    return upperFirst(moment(time).fromNow());
  } else if (moment().subtract(4, 'hours').isBefore(time)) {
    return `Começou ${moment(time).fromNow()}`;
  }

  return moment(time).format('DD/MM HH:mm');
};

export const fullDateFormat = (time) => {
  let day;

  if (moment().add(1, 'day').endOf('day').isBefore(time)) {
    day = 'dddd';
  } else if (moment().endOf('day').isBefore(time)) {
    day = '[Amanhã]';
  } else if (moment().startOf('day').isBefore(time)) {
    day = '[Hoje]';
  } else {
    day = 'dddd';
  }

  return moment(time).format(`${day} - DD [de] MMMM [de] YYYY`);
};

export const timeFormat = (time) => {
  if (moment().subtract(4, 'hours').isAfter(time)) {
    return moment(time).format('[Começou] kk[h]');
  } else if (moment().isAfter(time)) {
    return `Começou ${moment(time).fromNow()}`;
  } else if (moment().add(2, 'hours').isAfter(time)) {
    return `Começa ${moment(time).fromNow()}`;
  }

  return moment(time).format('[A partir das] kk[h]');
};
