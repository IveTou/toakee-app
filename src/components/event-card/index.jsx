import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { upperFirst } from 'lodash';
import moment from 'moment';
import { Card, Image, Icon } from 'semantic-ui-react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const renderLabel = (start) => {
  if (!start
    || moment().endOf('day').isBefore(start)
    || moment().subtract(4, 'hours').isAfter(start)
  ) return null;

  let content;

  if (moment().add(2, 'hours').isBefore(start)) {
    content = 'Hoje';
  } else if (moment().isBefore(start)) {
    content = upperFirst(start.fromNow());
  } else {
    content = `Começou ${start.fromNow()}`;
  }

  return { color: 'orange', content, ribbon: true };
};

const EventCard = ({ event: { slug, title, place, flyer, start } }) => {
  const time = moment(start);

  return (
    <Link className="EventCard" to={{ pathname: `/evento/${slug}` }}>
      <Card>
        <If condition={flyer}>
          <Image
            className="EventCard-background"
            label={renderLabel(time)}
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
              {time.format('MMM')}
            </div>
            <div className="EventCard-details-calendar-day">
              {time.format('DD')}
            </div>
          </div>
          <div className="EventCard-details-timeAndPlace">
            <div><Icon name="clock" />{time.format('HH')}h</div>
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
