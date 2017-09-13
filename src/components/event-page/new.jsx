import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Icon, Card, Image, Grid, Button, Visibility } from 'semantic-ui-react';
import Lightbox from 'react-images';
import classNames from 'classnames';
import autoBind from 'react-autobind';

import { deviceInfo } from '~/src/utils/device-info';
import { isLogged } from '~/src/utils/session';
import { fullDateFormat, timeFormat } from '~/src/utils/moment';
import TrackingAPI from '~/src/toakee-core/apis/tracking';

import query from './graphql';

if (process.env.BROWSER) {
  require('./style2.scss');
}

declare var image;
declare var index;

export class EventPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      galleryIsVisible: false,
      currentImage: 0,
      releaseFlyer: false,
      loadGallery: false,
    };
    autoBind(this);
  }

  componentWillReceiveProps({ viewer }) {
    if (!isLogged()) {
      TrackingAPI.track('Unlogged Event Page View', 'Guest');
    } else if (viewer) {
      TrackingAPI.track('Logged Event Page View', viewer.id);
    }
  }

  toggleGallery() {
    if (deviceInfo.isMobile) {
      this.props.router.push(`/evento/${this.props.viewer.event.slug}/photos`);
    } else {
      this.setState({ loadGallery: true, galleryIsVisible: !this.state.galleryIsVisible });
    }
  }

  handleClickPrev() {
    this.openPhoto(this.state.currentImage - 1);
  }

  handleClickNext() {
    this.openPhoto(this.state.currentImage + 1);
  }

  openPhoto(idx) {
    this.setState({ lightboxIsOpen: true, currentImage: idx });
  }

  closeLightBox() {
    this.setState({ lightboxIsOpen: false });
  }

  handleVisibility(_, { calculations: { bottomPassed, bottomVisible } }) {
    if ((bottomPassed || bottomVisible) !== this.state.releaseFlyer) {
      this.setState({ releaseFlyer: bottomPassed || bottomVisible });
    }
  }

  render() {
    const { galleryIsVisible, releaseFlyer, loadGallery } = this.state;
    const { viewer = {} } = this.props;
    const { event = {} } = viewer;
    const { title, description, place, start, price, flyer, photos = [] } = event;
    const flyerAlt = `Flyer do ${title || 'evento'}`;

    const classes = classNames('EventPage2', {
      'EventPage2--viewGallery': galleryIsVisible,
      'EventPage2--releaseFlyer': releaseFlyer,
    });


    return (
      <Visibility className={classes} onUpdate={this.handleVisibility}>
        <Grid columns={2}>
          <Grid.Column className="EventPage2-gallery" mobile={16} tablet={8} computer={8}>
            <Lightbox
              images={photos.map(src => ({ src }))}
              isOpen={this.state.lightboxIsOpen}
              onClickPrev={this.handleClickPrev}
              onClickNext={this.handleClickNext}
              onClose={this.closeLightBox}
              currentImage={this.state.currentImage}
            />
            <If condition={loadGallery}>
              <Image.Group size="small">
                <For each="image" of={photos} index="index">
                  <img
                    className="ui image"
                    style={{ backgroundImage: `url(${image})` }}
                    onClick={() => this.openPhoto(index)}
                  />
                </For>
              </Image.Group>
            </If>
          </Grid.Column>


          <Grid.Column className="EventPage2-details" mobile={16} tablet={8} computer={8}>
            <div className="EventPage2-details-header">
              <h1 className="EventPage2-details-header-title">
                {title}
              </h1>
              <If condition={place}>
                <div className="EventPage2-details-header-place">
                  {place.name}
                </div>
              </If>
            </div>

            <div className="EventPage2-details-info">
              <If condition={start}>
                <div className="EventPage2-details-info-item">
                  <Icon name="calendar" />
                  <span>{fullDateFormat(start)}</span>
                </div>
                <div className="EventPage2-details-info-item">
                  <Icon name="clock" />
                  <span>{timeFormat(start)}</span>
                </div>
              </If>
              <If condition={place && place.address}>
                <div className="EventPage2-details-info-item">
                  <Icon name="marker" />
                  <span>{place.address}</span>
                </div>
              </If>
              <If condition={price}>
                <div className="EventPage2-details-info-item">
                  <Icon name="dollar" />
                  <span>{price}</span>
                </div>
              </If>
            </div>

            <div className="EventPage2-details-body">
              <div className="EventPage2-details-body-description">
                <div className="EventPage2-details-body-title">Descrição</div>
                <div
                  className="EventPage2-details-body-content"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>
          </Grid.Column>

          <Grid.Column className="EventPage2-flyer" mobile={16} tablet={8} computer={8}>
            <Image alt={flyerAlt} className="EventPage2-flyer-bg" src={flyer} />
            <Card>
              <Image alt={flyerAlt} className="EventPage2-flyer-img" src={flyer} />
            </Card>
            <If condition={photos.length}>
              <Button
                className="EventPage2-flyer-trigger"
                onClick={this.toggleGallery}
                size="big"
                inverted
              >
                Ver {galleryIsVisible ? 'detalhes' : 'fotos'}
              </Button>
            </If>
          </Grid.Column>
        </Grid>
      </Visibility>
    );
  }
}

EventPage2.propTypes = {
  viewer: PropTypes.object,
  router: PropTypes.object,
};

export default graphql(query, {
  options: ({ router }) => ({
    variables: { slug: router.params.slug },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
})(EventPage2);
