import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { upperFirst } from 'lodash';
import moment from 'moment';
import { Card, CardHeader, CardMedia, CardText, List, ListItem } from 'material-ui';
import { ActionSchedule , MapsPlace } from 'material-ui/svg-icons';
import { grey500 } from 'material-ui/styles/colors';

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
    color: 'orange',
    ribbon: true,
  };
};

const EventCard = ({ event }) => {
  const { id, title, place, flyer, start, end, status } = event;
  const startMoment = moment(start);

  return (
    <Link className="EventCard" to={{ pathname: `/evento/${id}`, state: { event } }}>
      <Card>
        <If condition={flyer}>
          <CardMedia
            className="EventCard-flyer"
            alt={`flyer do ${title}`}
            title={`flyer do ${title}`}
          >
            <div
              className="EventCard-flyer-background"
              style={{ backgroundImage: `url(${flyer})` }}
            />
          </CardMedia>
        </If>
        <CardHeader className="EventCard-title" title={title} />
        <CardText className="EventCard-details">
          <div className="EventCard-details-calendar">
            <div className="EventCard-details-calendar-month">
              {startMoment.format('MMM')}
            </div>
            <div className="EventCard-details-calendar-day">
              {startMoment.format('DD')}
            </div>
          </div>
          <div className="EventCard-details-timeAndPlace">
            <div><MapsPlace color={grey500} /><span>{place.name}</span></div>
            <div><ActionSchedule color={grey500} /><span>{startMoment.format('HH')}h</span></div>
          </div>
        </CardText>
      </Card>
    </Link>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    place: PropTypes.object,
    start: PropTypes.string,
    flyer: PropTypes.string,
  }),
};

export default EventCard;
