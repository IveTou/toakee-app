import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Icon, Card, Image, Grid, Button } from 'semantic-ui-react';
import Lightbox from 'react-images';
import classNames from 'classnames';

import { isLogged } from '~/src/utils/session';
import { fullDateFormat, timeFormat } from '~/src/utils/moment';
import TrackingAPI from '~/src/toakee-core/apis/tracking';

import query from './graphql';

const images = [
  { src: 'https://images.unsplash.com/photo-1470619549108-b85c56fe5be8?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470619549108-b85c56fe5be8?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1471079502516-250c19af6928?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470854989922-5be2f7456d78?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470317596697-cbdeda56f999?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470619549108-b85c56fe5be8?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1471079502516-250c19af6928?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470854989922-5be2f7456d78?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470317596697-cbdeda56f999?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1471079502516-250c19af6928?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470854989922-5be2f7456d78?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470317596697-cbdeda56f999?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470619549108-b85c56fe5be8?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1471079502516-250c19af6928?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470854989922-5be2f7456d78?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470317596697-cbdeda56f999?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470619549108-b85c56fe5be8?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470619549108-b85c56fe5be8?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1471079502516-250c19af6928?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470854989922-5be2f7456d78?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470317596697-cbdeda56f999?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1471079502516-250c19af6928?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470854989922-5be2f7456d78?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
  { src: 'https://images.unsplash.com/photo-1470317596697-cbdeda56f999?dpr=2&auto=format&w=1024&h=1024', width: 500, height: 500 },
];

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
    };
  }

  componentWillReceiveProps({ viewer }) {
    if (!isLogged()) {
      TrackingAPI.track('Unlogged Event Page View', 'Guest');
    } else if (viewer) {
      TrackingAPI.track('Logged Event Page View', viewer.id);
    }
  }

  render() {
    const { viewer = {} } = this.props;
    const { galleryIsVisible } = this.state;
    const { event = {} } = viewer;
    const { title, description, place, start, price, flyer } = event;
    const flyerAlt = `Flyer do ${title || 'evento'}`;
    const flyerClasses = classNames('EventPage2-flyer', {
      'EventPage2-flyer--right': galleryIsVisible,
    });

    return (
      <div className="EventPage2">
        <Grid columns={2}>
          <Grid.Column className="EventPage2-gallery" mobile={16} tablet={8} computer={8}>
            <Lightbox
              images={images}
              isOpen={this.state.lightboxIsOpen}
              onClickPrev={() => this.setState({ currentImage: this.state.currentImage - 1 })}
              onClickNext={() => this.setState({ currentImage: this.state.currentImage + 1 })}
              onClose={() => this.setState({ lightboxIsOpen: false })}
              onClickThumbnail={() => this.setState({ lightboxIsOpen: true })}
              currentImage={this.state.currentImage}
            />
            <Image.Group size="small">
              <For each="image" of={images} index="index">
                <Image
                  src={image.src}
                  onClick={() => this.setState({ lightboxIsOpen: true, currentImage: index })}
                  bordered
                />
              </For>
            </Image.Group>
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

          <Grid.Column className={flyerClasses} mobile={16} tablet={8} computer={8}>
            <Image alt={flyerAlt} className="EventPage2-flyer-bg" src={flyer} />
            <Card>
              <Image alt={flyerAlt} className="EventPage2-flyer-img" src={flyer} />
            </Card>
            <Button
              className="EventPage2-flyer-trigger"
              onClick={() => this.setState({ galleryIsVisible: !galleryIsVisible })}
              inverted
            >
              Ver fotos
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

EventPage2.propTypes = {
  viewer: PropTypes.object,
};

export default graphql(query, {
  options: ({ router }) => ({
    variables: { slug: router.params.slug },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
})(EventPage2);
