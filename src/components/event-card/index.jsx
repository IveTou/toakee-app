import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';
import { Button, Card, CardContent, Typography, Icon } from 'material-ui';

import Calendar from '~/src/components/calendar';
import Ribbon from '~/src/components/ribbon';

import { withIndexStyle } from './styles';

const EventCard = ({ asButton, event, classes, onClick, to }) => {
  const { title, place, flyer, start, end, status, discountLists } = event;
  const startMoment = moment(start);
  const Component = asButton ? Button : Link;
  const rootClasses = classNames(classes.linkRoot, asButton && classes.buttonRoot);

  return (
    <Component to={to} onClick={onClick} >
      <Card className={rootClasses}>
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
          <If condition={asButton}>
            <Calendar className={asButton && classes.calendar} date={startMoment} small />
          </If>
          <Typography variant="subheading" className={classes.cardContentHeader}>
            {title}
          </Typography>
          <If condition={!asButton}>
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
          </If>
        </CardContent>
      </Card>
    </Component>
  );
};

EventCard.propTypes = {
  asButton: PropTypes.bool,
  classes: PropTypes.object,
  to: PropTypes.object,
  onClick: PropTypes.func,
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    place: PropTypes.object,
    start: PropTypes.string,
    flyer: PropTypes.string,
  }),
};

export default withIndexStyle(EventCard);
