import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Typography } from 'material-ui';

import Calendar from '~/src/components/calendar';
import {ASSETS_BASE_URI, ASSETS_BANNERS_PATH } from '~/src/config';
import { withIndexStyle } from './styles';

const defaultContent = {
  visible: true,
  title: 'ESCAPE: Subversão',
  description: 'Toda quarta de maio, 19:30, Teatro SESI Rio Vermelho. Também estamos na Campus Party #2!',
  flyer: `${ASSETS_BASE_URI}/${ASSETS_BANNERS_PATH}/escape.jpg`,
  url: '/',
  place: '',
  time: '',
};

const Banner = ({ classes, content = defaultContent }) => {
  const { visible, title, description, flyer, url, place, time } = content;

  return(
    <Link className={classes.wrapper} to={url} style={{ backgroundImage: `url('${flyer}')` }} >
      <If condition={visible}>
        <div className={classes.overlay} >
          <Typography
            className={classes.title}
            color="inherit"
            paragraph
            gutterBottom
          >
            {title}
          </Typography>
          <If condition={description}>
            <Typography
              className={classes.description}
              color="inherit"
              paragraph
              gutterBottom
            >
              {description}
            </Typography>
          </If>
          <If condition={place && time}>
            <Calendar className={classes.calendar} />
            <div className={classes.timePlace}>
              <div>
                <Icon className={classes.icon}>place</Icon>
                <Typography variant="subheading" color="inherit" noWrap>
                  {place}
                </Typography>
              </div>
              <div>
                <Icon className={classes.icon}>schedule</Icon>
                <Typography variant="subheading" color="inherit">
                  {time}
                </Typography>
              </div>
            </div>
          </If>
        </div>
      </If>
    </Link>
  );
}

Banner.propTypes = {
  classes: PropTypes.object,
  content: PropTypes.object,
};

export default withIndexStyle(Banner);
