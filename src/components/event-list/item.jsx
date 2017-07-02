import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { upperFirst } from 'lodash';
import moment from 'moment';
import { Card, Image, Icon } from 'semantic-ui-react';

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

const EventListItem = ({ slug, title, place, flyer, start }) => {
  const time = moment(start);

  return (
    <Link className="EventListItem" to={{ pathname: `/evento/${slug}` }}>
      <Card>
        <If condition={flyer}>
          <Image
            className="EventListItem-background"
            label={renderLabel(time)}
            alt={`flyer do ${title}`}
            src={flyer}
          />
        </If>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{place.name}</Card.Meta>
        </Card.Content>
        <Card.Content className="EventListItem-details" extra>
          <div className="EventListItem-details-calendar">
            <div className="EventListItem-details-calendar-month">
              {time.format('MMM')}
            </div>
            <div className="EventListItem-details-calendar-day">
              {time.format('DD')}
            </div>
          </div>
          <div className="EventListItem-details-timeAndPlace">
            <div><Icon name="clock" />{time.format('HH')}h</div>
            <div><Icon name="marker" />{place.address}</div>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
};

EventListItem.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  place: PropTypes.object,
  start: PropTypes.object,
  flyer: PropTypes.string,
};

export default EventListItem;
