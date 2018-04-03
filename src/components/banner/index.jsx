import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Typography } from 'material-ui';

import Calendar from '~/src/components/calendar';
import { withIndexStyle } from './styles';

const defaultContent = {
  visible: true,
  title: 'O Toakee está esperando por você.',
  description: 'Divulgue seus eventos no melhor guia de eventos em Salvador!',
  flyer: 'http://res.cloudinary.com/toakeeassets/image/upload/s--l-ikx678--/v1505264577/core/site/signup-bg-2.jpg',
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
            variant="display1"
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
