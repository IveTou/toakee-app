import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Typography } from 'material-ui';

import { withIndexStyle } from './styles';

const Banner = ({ classes }) => {
  return(
    <Link className={classes.wrapper} to="/">
      <div className={classes.description} >
        <Typography
          className={classes.title}
          variant="display1"
          color="inherit"
          paragraph
          gutterBottom
        >
          Title more title titled is that right?
        </Typography>
        <div className={classes.calendar}>
          <Typography variant="title" color="inherit">
            Jan
          </Typography>
          <Typography variant="display1" color="inherit">
            23
          </Typography>
        </div>
        <div className={classes.timePlace}>
          <div>
            <Icon className={classes.icon}>place</Icon>
            <Typography variant="subheading" color="inherit" noWrap>
              place the placeis name has to be in 2 line no more and fill the lmited space
            </Typography>
          </div>
          <div>
            <Icon className={classes.icon}>schedule</Icon>
            <Typography variant="subheading" color="inherit">
              17h
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}

Banner.propTypes = {
  classes: PropTypes.object,
};

export default withIndexStyle(Banner);
