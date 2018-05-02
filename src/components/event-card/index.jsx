import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, CardContent, Typography, Icon } from 'material-ui';

import Calendar from '~/src/components/calendar';
import Ribbon from '~/src/components/ribbon';

import { withIndexStyle } from './styles';

const EventCard = ({ event, className, classes }) => {
  const { id, title, place, flyer, start, end, status, discountLists } = event;
  const startMoment = moment(start);

  return (
    <Link className={className} to={{ pathname: `/evento/${id}`, state: { event } }}>
      <Card className={classes.card}>
        <div className={classes.cardMedia}>
          <div
            className={classes.cardImage}
            alt={`flyer do ${title}`}
            style={{ backgroundImage: `url("${flyer}")` }}
          />
          <Ribbon
            mini
            status={status}
            start={startMoment}
            end={moment(end)}
            discountLists={discountLists}
          />
        </div>
        <CardContent className={classes.cardContent}>
          <Typography variant="subheading" className={classes.cardContentHeader}>
            {title}
          </Typography>
          <div className={classes.cardContentInfo}>
            <Calendar date={startMoment} small />
            <Typography
              className={classes.cardContentInfoDetails}
              variant="body1"
              component="div"
            >
              <div>
                <Icon className={classes.cardContentInfoDetailsIcon}>place</Icon>
                <span> {place.name}</span>
              </div>
              <div>
                <Icon className={classes.cardContentInfoDetailsIcon}>schedule</Icon>
                {startMoment.format(' HH:mm')}
              </div>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

EventCard.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    place: PropTypes.object,
    start: PropTypes.string,
    flyer: PropTypes.string,
  }),
};

export default withIndexStyle(EventCard);
