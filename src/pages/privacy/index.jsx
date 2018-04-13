import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';

import intro from './intro.js';

import { withIndexStyle } from './styles';

const Privacy = ({ classes }) => {
  declare var introItem;

  return (
    <div className={classes.root}>
      <Typography variant="display1" gutterBottom>Políticas de Privacidade</Typography>
      <Typography variant="subheading" align="justify" component="ul" className={classes.list}>
        <For each="introItem" of={intro} index="index">
          <li key={index} className={classes.listItem} dangerouslySetInnerHTML={{ __html: introItem }} />
        </For>
      </Typography>

    </div>
  );
};

Privacy.propTypes = {
  classes: PropTypes.object,
};

export default withIndexStyle(Privacy);
