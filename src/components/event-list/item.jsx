import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { upperFirst } from 'lodash';
import moment from 'moment';

const renderFlyer = (flyer, alt) => flyer && (
  <img alt={alt} className="EventListItem-background" src={flyer} />
);

const renderTime = (start) => {
  if (!start) return null;

  let dom;

  // FIXME next to end of week conflicts with today/tomorrow
  if (moment().endOf('week').isBefore(start)) {
    dom = moment(start).format('DD/MM (ddd)');
  } else if (moment().add(1, 'day').endOf('day').isBefore(start)) {
    dom = moment(start).format('dddd HH:mm');
  } else if (moment().endOf('day').isBefore(start)) {
    dom = moment(start).format('[Amanhã] HH:mm');
  } else if (moment().add(2, 'hours').isBefore(start)) {
    dom = moment(start).format('[Hoje] HH:mm');
  } else if (moment().isBefore(start)) {
    dom = upperFirst(moment(start).fromNow());
  } else if (moment().subtract(4, 'hours').isBefore(start)) {
    dom = `Começou ${moment(start).fromNow()}`;
  } else {
    dom = moment(start).format('DD/MM HH:mm');
  }

  return <div className="EventListItem-content-time">{dom}</div>;
};

const EventListItem = ({ slug, title, flyer, start }) => (
  <div className="EventListItem mdl-card mdl-shadow--2dp">
    <Link className="EventListItem-link img" to={{ pathname: `/evento/${slug}` }}>
      {renderFlyer(flyer, `flyer do ${title}`)}
    </Link>
    <Link className="EventListItem-link" to={{ pathname: `/evento/${slug}` }}>
      <div className="EventListItem-content">
        <div className="EventListItem-content-title mdl-card__title">
          <h2 className="EventListItem-content-title-text mdl-card__title-text">
            {title}
          </h2>
        </div>
        {renderTime(start)}
      </div>
    </Link>
  </div>
);

EventListItem.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  start: PropTypes.object,
  flyer: PropTypes.string,
};

export default EventListItem;
