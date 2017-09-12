import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Icon, Card, Image, Grid } from 'semantic-ui-react';

import { isLogged } from '~/src/utils/session';
import { fullDateFormat, timeFormat } from '~/src/utils/moment';
import TrackingAPI from '~/src/toakee-core/apis/tracking';

import query from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

export class EventPage extends React.Component {
  componentWillReceiveProps({ viewer }) {
    if (!isLogged()) {
      TrackingAPI.track('Unlogged Event Page View', 'Guest');
    } else if (viewer) {
      TrackingAPI.track('Logged Event Page View', viewer.id);
    }
  }

  render() {
    const { viewer = {} } = this.props;
    const { event = {} } = viewer;
    const { title, description, place, start, price, flyer } = event;
    const flyerAlt = `Flyer do ${title || 'evento'}`;

    return (
      <div className="EventPage">
        <Grid columns={2}>

          <Grid.Column className="EventPage-flyer" mobile={16} tablet={8} computer={8}>
            <Image alt={flyerAlt} className="EventPage-flyer-bg" src={flyer} />
            <Card>
              <Image alt={flyerAlt} className="EventPage-flyer-img" src={flyer} />
            </Card>
          </Grid.Column>

          <Grid.Column className="EventPage-details" mobile={16} tablet={8} computer={8}>
            <div className="EventPage-details-header">
              <h1 className="EventPage-details-header-title">
                {title}
              </h1>
              <If condition={place}>
                <div className="EventPage-details-header-place">
                  {place.name}
                </div>
              </If>
            </div>

            <div className="EventPage-details-info">
              <If condition={start}>
                <div className="EventPage-details-info-item">
                  <Icon name="calendar" />
                  <span>{fullDateFormat(start)}</span>
                </div>
                <div className="EventPage-details-info-item">
                  <Icon name="clock" />
                  <span>{timeFormat(start)}</span>
                </div>
              </If>
              <If condition={place && place.address}>
                <div className="EventPage-details-info-item">
                  <Icon name="marker" />
                  <span>{place.address}</span>
                </div>
              </If>
              <If condition={price}>
                <div className="EventPage-details-info-item">
                  <Icon name="dollar" />
                  <span>{price}</span>
                </div>
              </If>
            </div>

            <div className="EventPage-details-body">
              <div className="EventPage-details-body-description">
                <div className="EventPage-details-body-title">Descrição</div>
                <div
                  className="EventPage-details-body-content"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

EventPage.propTypes = {
  viewer: PropTypes.object,
};

export default graphql(query, {
  options: ({ router }) => ({
    variables: { slug: router.params.slug },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
})(EventPage);
