import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { upperFirst } from 'lodash';
import moment from 'moment';
import { Icon, CardHeader, CardMedia } from 'material-ui';

if (process.env.BROWSER) {
  require('./style.scss');
}

const renderLabel = (status, start, end) => {
  if (status === 'PENDING' || status === 'REPROVED') {
    return {
      content: status === 'PENDING' ? 'Pendente de aprovação' : 'Reprovado',
      color: status === 'PENDING' ? 'blue' : 'red',
      ribbon: true,
    };
  }

  const now = moment();

  if (end.isBefore(now) || start.isAfter(moment().add(4, 'hours'))) {
    return null;
  }

  return {
    content: start.isSameOrBefore(now) && end.isSameOrAfter(now)
      ? 'Acontecendo agora'
      : upperFirst(start.fromNow()),
  };
};

const EventCard = ({ event, vertical }) => {
  const { id, title, place, flyer, start, end, status } = event;
  const startMoment = moment(start);
  const ribbon = renderLabel(status, startMoment, moment(end));
  const classes = classNames('EventCard', { 'EventCard--vertical': vertical });

  return (
    <Link className={classes} to={{ pathname: `/evento/${id}`, state: { event } }}>
      <div>
        <If condition={flyer}>
          <CardMedia
            className="EventCard-flyer"
            image=""
            alt={`flyer do ${title}`}
          >
            <div
              className="EventCard-flyer-background"
              style={{ backgroundImage: `url(${flyer})` }}
            />
            <If condition={ribbon}>
              <div className="EventCard-flyer-ribbon">
                {ribbon.content}
              </div>
            </If>
          </CardMedia>
        </If>
        <CardHeader className="EventCard-title" title={title} />
        <div className="EventCard-details-calendar">
          <div className="EventCard-details-calendar-month">
            {startMoment.format('MMM')}
          </div>
          <div className="EventCard-details-calendar-day">
            {startMoment.format('DD')}
          </div>
        </div>
        <div className="EventCard-details-timeAndPlace">
          <div className="EventCard-details-timeAndPlace-place">
            <Icon>place</Icon> <span>{place.name}</span>
          </div>
          <div className="EventCard-details-timeAndPlace-time">
            <Icon>schedule</Icon> <span>{startMoment.format('HH')}h</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

EventCard.propTypes = {
  vertical: PropTypes.bool,
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    place: PropTypes.object,
    start: PropTypes.string,
    flyer: PropTypes.string,
  }),
};

export default EventCard;
