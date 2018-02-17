import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Lightbox from 'react-images';
import { take, map } from 'lodash';
import moment from 'moment';
import {
  Icon,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  GridList,
  GridTile,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'material-ui';

import classNames from 'classnames';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';

import EventList from '~/src/components/event-list';
import Wrapper from '~/src/components/map';
import { fullDateFormat, timeFormat } from '~/src/utils/moment';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import { withInfo } from '~/src/hocs';

import query, { setEventStatusMutation } from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

export class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      galleryIsVisible: false,
    };
    autoBind(this);
  }

  componentWillReceiveProps({ viewer }) {
    TrackingAPI.viewerSafeTrack(viewer, 'Event Page View');
  }

  toggleGallery() {
    this.setState({ galleryIsVisible: !this.state.galleryIsVisible });
  }

  openGallery() {
    this.setState({ galleryIsVisible: true });
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

  fbShare() {
    FB.ui({
      mobile_iframe: true,
      method: 'share',
      hashtag: '#toakee',
      href: location.href,
    }, (res) => {
      if (res && !res.error_message) {
        TrackingAPI.viewerSafeTrack(this.props.viewer, 'Share Event Trigger');
      }
    });
  }

  renderModerationButtons() {
    const { setStatus, event } = this.props;
    const { status: eventStatus } = event || {};
    const buttonProps = [
      { label: 'Aprovar', status: 'ACTIVE' },
      { label: 'Reprovar', status: 'REPROVED' },
      { label: 'Esconder', status: 'PENDING' },
    ];

    return buttonProps.map(({ label, status }) => (
      <Button
        variant="raised"
        className="EventPage-main-flyer-actions-button"
        key={label}
        disabled={status === eventStatus}
        onClick={() => setStatus(status)}
      >
        {label}
      </Button>
    ));
  }

  render() {
    const { event: preEvent } = this.props.location.state || {};
    const { galleryIsVisible } = this.state;
    const { viewer = {}, event = preEvent } = this.props;
    const {
      id,
      title,
      description,
      directions,
      place,
      start,
      flyer,
      price,
      prices = [],
      photos = [],
      creator = {},
      categories = [],
    } = event || {};
    const flyerAlt = `Flyer do ${title || 'evento'}`;
    const mappedPrice = price ? [{ value: price }] : prices;
    const isMobile = !this.props.deviceInfo.is('desktop');
    const previewThumbs = take(photos, isMobile ? 8 : 16);

    const classes = classNames('EventPage', {
      'EventPage--viewGallery': photos.length,
      'EventPage--galleryIsVisible': galleryIsVisible,
      'EventPage--isAdmin': viewer.isAdmin,
    });

    declare var index;
    declare var priceItem;
    declare var photosItem;
    declare var previewItem;

    return (
      <div className={classes}>
        <div className="EventPage-main">
          <Card>
            <CardMedia image={flyer} className="EventPage-main-flyer" alt={flyerAlt}>
              <div className="EventPage-main-flyer-actions">
                <Button
                  className="EventPage-main-flyer-actions-button"
                  label="VEJA COMO FOI!"
                  onClick={this.openGallery}
                  containerElement={
                    <Link to="gallery-header" smooth offset={300} duration={500} />
                  }
                >
                  Veja como foi!
                </Button>
                <If condition={viewer.isAdmin}>{this.renderModerationButtons()}</If>
              </div>
              <div className="EventPage-main-flyer-overlay">
                <div className="EventPage-main-flyer-overlay-title">
                  <h1>{title}</h1>
                </div>
                <div className="EventPage-main-flyer-overlay-actions">
                  <If condition={creator.id === viewer.id}>
                    <Button variant="fab" title="Editar" href={`/evento/${id}/editar`}>
                      <Icon>mode_edit</Icon>
                    </Button>
                  </If>
                  <Button
                    variant="fab"
                    title="Compartilhar"
                    onClick={this.fbShare}
                    color="secondary"
                  >
                    <Icon>share</Icon>
                  </Button>
                </div>
              </div>
            </CardMedia>
          </Card>

          <If condition={photos.length}>
            <Card className="EventPage-main-gallery">
              <Lightbox
                images={photos.map(({ src }) => ({ src }))}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={this.handleClickPrev}
                onClickNext={this.handleClickNext}
                onClose={this.closeLightBox}
                currentImage={this.state.currentImage}
              />
              <Element name="gallery-header">
                <CardHeader
                  className="EventPage-main-gallery-title"
                  title="Galeria de Fotos"
                  avatar={
                    <Avatar icon={<Icon>photo_camera</Icon>} size={30} />
                  }
                />
              </Element>
              <If condition={!galleryIsVisible}>
                <CardContent className="EventPage-main-gallery-preview">
                  <GridList cols={2.2}>
                    <For each="previewItem" of={previewThumbs}>
                      <GridTile key={previewItem.thumb}><img src={previewItem.thumb} /></GridTile>
                    </For>
                  </GridList>
                </CardContent>
              </If>
              <div className="EventPage-main-gallery-actions">
                <Button variant="raised" onClick={this.toggleGallery} color="secondary">
                  {galleryIsVisible ? 'Fechar Galeria' : 'Abrir Galeria'}
                </Button>
              </div>
              <If condition={galleryIsVisible}>
                <CardContent className="EventPage-main-gallery-photos">
                  <GridList cellHeight="auto">
                    <For each="photosItem" of={photos} index="index">
                      <GridTile key={index}>
                        <img src={photosItem.thumb} onClick={() => this.openPhoto(index)} />
                      </GridTile>
                    </For>
                  </GridList>
                </CardContent>
              </If>
            </Card>
          </If>

          <Card className="EventPage-main-details">
            <CardHeader
              className="EventPage-main-details-title"
              title="Detalhes"
              avatar={<Avatar icon={<Icon>event</Icon>} size={30} />}
            />
            <CardContent>
              <List className="EventPage-main-details-info">
                <If condition={start}>
                  <ListItem>
                    <ListItemIcon><Icon>date_range</Icon></ListItemIcon>
                    <ListItemText primary={fullDateFormat(start)} />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon><Icon>schedule</Icon></ListItemIcon>
                    <ListItemText primary={timeFormat(start)} />
                  </ListItem>
                </If>
                <If condition={place && place.address}>
                  <ListItem>
                    <ListItemIcon><Icon>place</Icon></ListItemIcon>
                    <ListItemText primary={place.address} />
                  </ListItem>
                </If>
              </List>
            </CardContent>
          </Card>

          <Card className="EventPage-main-prices">
            <CardHeader
              className="EventPage-main-prices-title"
              title="Preços"
              avatar={
                <Avatar icon={<Icon>attach_money</Icon>} size={30} />
              }
            />
            <CardContent>
              <List className="EventPage-main-prices-info">
                <For each="priceItem" of={mappedPrice}>
                  <ListItem key={priceItem.description}>
                    <ListItemText
                      primary={priceItem.description || 'Entrada'}
                      secondary={priceItem.value}
                    />
                  </ListItem>
                </For>
              </List>
            </CardContent>
          </Card>

          <Card className="EventPage-main-description">
            <CardHeader
              className="EventPage-main-description-title"
              title="Descrição"
              avatar={<Avatar icon={<Icon>description</Icon>} size={30} />}
            />
            <CardContent>
              <div
                className="EventPage-main-description-info"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </CardContent>
          </Card>

          <If condition={directions}>
            <Card className="EventPage-main-map" name="map">
              <CardHeader
                className="EventPage-main-map-title"
                title="Mapa"
                avatar={
                  <Avatar icon={<Icon>map</Icon>} size={30} />
                }
              />
              <CardContent>
                <Element name="map">
                  <Wrapper center={directions} />
                </Element>
              </CardContent>
            </Card>
          </If>
        </div>

        <div className="EventPage-related">
          <If condition={categories.length}>
            <EventList
              title="Eventos Relacionados"
              start={moment().startOf('hour')}
              categoryIds={map(categories, 'id')}
              excludedEventId={id}
              vertical={!isMobile}
            />
          </If>
        </div>
      </div>
    );
  }
}

EventPage.propTypes = {
  event: PropTypes.object,
  viewer: PropTypes.object,
  setStatus: PropTypes.func,
  deviceInfo: PropTypes.object,
  location: PropTypes.object,
};

const injectSetEventStatusMutation = graphql(setEventStatusMutation, {
  props: ({ mutate, ownProps: { event } }) => ({
    setStatus: (status) => {
      const { id: eventId } = event;

      return mutate({
        variables: { eventId, status },
        update: (store, { data: { updateEvent } }) => {
          const data = store.readQuery({ query, variables: { id: eventId } });
          if (updateEvent) {
            data.event.status = status;
          }

          store.writeQuery({ query, data });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateEvent: true,
        },
      });
    },
  }),
});

const injectData = graphql(query, {
  options: ({ match }) => ({ variables: { id: match.params.id } }),
  props: ({ data: { event }, ownProps: { location } }) => ({ event, location }),
});

export default compose(
  injectData,
  injectSetEventStatusMutation,
  withInfo(['viewer', 'deviceInfo']),
)(EventPage);

