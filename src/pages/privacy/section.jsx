import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';

import { withIndexStyle } from './styles';

const Section = ({ title, titleVariant, content, key, classes }) => {
  declare var item;

  return(
    <div key={key}>
      <Typography variant={titleVariant} gutterBottom>{title}</Typography>
      <Typography variant="subheading" align="justify" component="ul" className={classes.list}>
        <For each="item" of={content} index="index">
          <li
            key={index}
            className={classes.listItem}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </For>
      </Typography>
    </div>
  );
}

Section.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  titleVariant: PropTypes.string,
  content: PropTypes.object,
  key: PropTypes.string,
};

export default withIndexStyle(Section);
