import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { upperFirst } from 'lodash';
import moment from 'moment';
import { Card, Image, Icon } from 'semantic-ui-react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const renderLabel = (status, start, end) => {
  if (status !== 'ACTIVE') {
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

const EventCard = ({ event: { slug, title, place, flyer, start, end, status } }) => {
  const startMoment = moment(start);

  return (
    <Link className="EventCard" to={{ pathname: `/evento/${slug}` }}>
      <Card>
        <If condition={flyer}>
          <Image
            className="EventCard-background"
            label={renderLabel(status, startMoment, moment(end))}
            alt={`flyer do ${title}`}
            src={flyer}
          />
        </If>
        <Card.Content>
          <Card.Header><span title={title}>{title}</span></Card.Header>
          <Card.Meta>{place.name}</Card.Meta>
        </Card.Content>
        <Card.Content className="EventCard-details" extra>
          <div className="EventCard-details-calendar">
            <div className="EventCard-details-calendar-month">
              {startMoment.format('MMM')}
            </div>
            <div className="EventCard-details-calendar-day">
              {startMoment.format('DD')}
            </div>
          </div>
          <div className="EventCard-details-timeAndPlace">
            <div><Icon name="clock" />{startMoment.format('HH')}h</div>
            <div><Icon name="marker" />{place.address}</div>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    place: PropTypes.object,
    start: PropTypes.string,
    flyer: PropTypes.string,
  }),
};

export default EventCard;
