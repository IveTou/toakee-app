import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Icon, Card, Image, Grid, Button } from 'semantic-ui-react';
import Lightbox from 'react-images';
import classNames from 'classnames';
import autoBind from 'react-autobind';

import DefaultLayout from '~/src/layouts/default';
import { deviceInfo } from '~/src/utils/device-info';
import { isLogged } from '~/src/utils/session';
import { fullDateFormat, timeFormat } from '~/src/utils/moment';
import TrackingAPI from '~/src/toakee-core/apis/tracking';

import query from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var image;
declare var index;

export class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      galleryIsVisible: false,
      currentImage: 0,
      loadGallery: false,
      lastScrollTop: 0,
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
      this.props.history.push(`/evento/${this.props.viewer.events[0].slug}/fotos`);
    } else {
      const { lastScrollTop, galleryIsVisible } = this.state;

      this.setState({
        loadGallery: true,
        galleryIsVisible: !galleryIsVisible,
        lastScrollTop: document.body.scrollTop,
      }, () => { document.body.scrollTop = lastScrollTop; });
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

  render() {
    const { galleryIsVisible, loadGallery } = this.state;
    const { viewer = {} } = this.props;
    const [event] = (viewer.events || []);
    const { title, description, place, start, price, prices, flyer, photos = [] } = event || {};
    const flyerAlt = `Flyer do ${title || 'evento'}`;

    const classes = classNames('EventPage', { 'EventPage--viewGallery': galleryIsVisible });

    return (
      <DefaultLayout>
        <Grid columns={2} className={classes}>
          <Grid.Column className="EventPage-gallery" mobile={16} tablet={8} computer={8}>
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
              <Choose>
                <When condition={prices && !!prices.length}>
                  <div className="EventPage-details-info-item mult">
                    <Icon name="dollar" />
                    <span>
                      {prices.map(cost => `${cost.description}: ${cost.value}`).join(' | ')}
                    </span>
                  </div>
                </When>
                <Otherwise>
                  <If condition={price}>
                    <div className="EventPage-details-info-item solo">
                      <Icon name="dollar" />
                      <span>{price}</span>
                    </div>
                  </If>
                </Otherwise>
              </Choose>
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

          <Grid.Column className="EventPage-flyer" mobile={16} tablet={8} computer={8}>
            <div
              className="EventPage-flyer-bg"
              style={{ backgroundImage: `url(${flyer})` }}
            />
            <Card>
              <Image alt={flyerAlt} className="EventPage-flyer-img" src={flyer} />
              <If condition={photos.length}>
                <Button
                  onClick={this.toggleGallery}
                  size="large"
                  color="orange"
                >
                  Ver {galleryIsVisible ? 'detalhes' : 'fotos'}
                </Button>
              </If>
            </Card>
          </Grid.Column>
        </Grid>
      </DefaultLayout>
    );
  }
}

EventPage.propTypes = {
  viewer: PropTypes.object,
  history: PropTypes.object,
};

export default graphql(query, {
  options: ({ match }) => ({
    variables: { slug: match.params.slug },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
})(EventPage);
