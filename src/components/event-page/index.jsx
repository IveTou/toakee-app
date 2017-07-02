import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Icon } from 'semantic-ui-react';

import config from '~/src/config';

import { fullDateFormat, timeFormat } from '~/src/utils/moment';


import query from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

const EventPage = ({ viewer = {} }) => {
  const { event = {} } = viewer;
  const { title, description, place, start, price, flyer } = event;
  const flyerAlt = `Flyer do ${title || 'evento'}`;
  const flyerSrc = flyer || `${config.ASSETS_BASE_URI}/core/site/partying`;

  return (
    <div className="EventPage">
      <div className="EventPage-header">
        <div className="EventPage-header-flyer mdl-card mdl-shadow--2dp">
          <img alt={flyerAlt} className="EventPage-header-flyer-img" src={flyerSrc} />
        </div>
        <div className="EventPage-header-right">
          <div className="EventPage-header-right-title">
            {title}
          </div>
          <If condition={place}>
            <div className="EventPage-header-right-place">
              {place.name}
            </div>
          </If>
        </div>
      </div>

      <div className="EventPage-info">
        <If condition={start}>
          <div className="EventPage-info-item">
            <Icon name="calendar" />
            <span>{fullDateFormat(start)}</span>
          </div>
          <div className="EventPage-info-item">
            <Icon name="clock" />
            <span>{timeFormat(start)}</span>
          </div>
        </If>
        <If condition={place && place.address}>
          <div className="EventPage-info-item">
            <Icon name="marker" />
            <span>{place.address}</span>
          </div>
        </If>
        <If condition={price}>
          <div className="EventPage-info-item">
            <Icon name="dollar" />
            <span>{price}</span>
          </div>
        </If>
      </div>

      <div className="EventPage-body">
        <div className="EventPage-body-description">
          <div className="EventPage-body-title">Descrição</div>
          <div
            className="EventPage-body-content"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
};

EventPage.propTypes = {
  viewer: PropTypes.object,
};

export default graphql(query, {
  options: ({ router }) => ({
    variables: { slug: router.params.slug },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
})(EventPage);
