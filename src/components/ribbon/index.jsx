import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { upperFirst, get } from 'lodash';
import { Paper, Typography } from 'material-ui';
import { deepOrange, green } from 'material-ui/colors';

import { withIndexStyle } from './styles';

const renderRibbonContent = (status, start, end, discountLists) => {
  if (status === 'PENDING' || status === 'REPROVED') {
    return {
      content: status === 'PENDING' ? 'Pendente de aprovação' : 'Reprovado',
      color: status === 'PENDING' ? 'blue' : 'red',
    };
  }

  if (get(discountLists, 'length')) {
    return {
      content: 'Lista de desconto',
      color: green[500],
    }
  }

  const now = moment();

  if (end.isBefore(now) || start.isAfter(moment().add(4, 'hours'))) {
    return null;
  }

  return {
    content: start.isSameOrBefore(now) && end.isSameOrAfter(now)
      ? 'Acontecendo agora'
      : upperFirst(start.fromNow()),
    color: deepOrange[500],
  };
};

const Ribbon = ({ classes, status, start, end, discountLists }) => {
  const ribbon = renderRibbonContent(status, start, end, discountLists);

  return(
    <If condition={ribbon}>
      <Paper className={classes.root} elevation={4} style={{ backgroundColor: `${ribbon.color}` }}>
        <Typography className={classes.caption} variant="caption" color="inherit">
          {ribbon.content}
        </Typography>
      </Paper>
    </If>
  );
}

Ribbon.propTypes = {
  classes: PropTypes.object,
  status: PropTypes.string,
  start: PropTypes.object,
  end: PropTypes.object,
  discountLists: PropTypes.array,
};

export default withIndexStyle(Ribbon);
