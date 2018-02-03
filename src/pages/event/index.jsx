import React, { PropTypes } from 'react';
import { Link, Element } from 'react-scroll';
import Lightbox from 'react-images';
import { graphql, compose } from 'react-apollo';
import { take, map } from 'lodash';
import moment from 'moment';
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardText,
  Divider,
  FlatButton,
  RaisedButton,
  FloatingActionButton,
  GridList,
  GridTile,
  List,
  ListItem,
} from 'material-ui';
import {
  ActionEvent,
  ActionDateRange,
  ActionDescription,
  ActionSchedule,
  EditorAttachMoney,
  EditorModeEdit,
  ImagePhotoCamera,
  MapsPlace,
  MapsMap,
  SocialShare,
} from 'material-ui/svg-icons';
import {
  amber500,
  deepOrange500,
  deepPurple500,
  green500,
  lightBlue500,
  red500,
  white,
  grey500,
} from 'material-ui/styles/colors';
import classNames from 'classnames';
import autoBind from 'react-autobind';
import DefaultLayout from '~/src/layouts/default';
import { ease } from '~/src/utils/animation';
import EventList from '~/src/components/event-list';
import EventListArrow from '~/src/components/event-list/arrow';
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

  scroll(direction) {
    const node = this._listDOM || {};
    const startingPoint = node.scrollTop;
    const amount = node.offsetHeight * 0.8 * direction;

    ease(500, (tweaker) => {
      node.scrollTop = startingPoint + (tweaker * amount);
    }, () => this.forceUpdate());
  }

  renderModerationButtons() {
    const { setStatus, event } = this.props;
    const { status: eventStatus } = event || {};
    const buttonProps = [
      { label: 'Aprovar', color: green500, status: 'ACTIVE' },
      { label: 'Reprovar', color: red500, status: 'REPROVED' },
      { label: 'Esconder', color: amber500, status: 'PENDING' },
    ];

    return buttonProps.map(({ label, color, status }) => (
      <RaisedButton
        className="EventPage-main-flyer-actions-button"
        key={label}
        backgroundColor={color}
        labelColor={white}
        label={label}
        disabled={status === eventStatus}
        onClick={() => setStatus(status)}
      />
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

    const node = this._listDOM || {};
    const hideTopArrow = !node.scrollTop;
    const hideBottomArrow = node.scrollTop + node.offsetHeight >= node.scrollHeight;

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
      <DefaultLayout title={title}>
        <div className={classes}>
          <div className="EventPage-main">
            <Card>
              <CardMedia className="EventPage-main-flyer" alt={flyerAlt}>
                <div
                  className="EventPage-main-flyer-bg"
                  style={{ backgroundImage: `url(${flyer})` }}
                />
                <div className="EventPage-main-flyer-actions">
                  <FlatButton
                    className="EventPage-main-flyer-actions-button"
                    label="VEJA COMO FOI!"
                    onClick={this.openGallery}
                    containerElement={
                      <Link to="gallery-header" smooth offset={300} duration={500} />
                    }
                  />
                  <If condition={viewer.isAdmin}>{this.renderModerationButtons()}</If>
                </div>
                <div className="EventPage-main-flyer-overlay">
                  <div className="EventPage-main-flyer-overlay-title">
                    <h1>{title}</h1>
                  </div>
                  <div className="EventPage-main-flyer-overlay-actions">
                    <If condition={creator.id === viewer.id}>
                      <FloatingActionButton
                        title="Editar"
                        backgroundColor={grey500}
                        href={`/evento/${id}/editar`}
                      >
                        <EditorModeEdit />
                      </FloatingActionButton>
                    </If>
                    <FloatingActionButton title="Compartilhar" onClick={this.fbShare} secondary>
                      <SocialShare />
                    </FloatingActionButton>
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
                      <Avatar
                        icon={<ImagePhotoCamera />}
                        backgroundColor={deepPurple500}
                        size={30}
                      />
                    }
                  />
                </Element>
                <If condition={!galleryIsVisible}>
                  <CardText className="EventPage-main-gallery-preview">
                    <GridList cols={2.2}>
                      <For each="previewItem" of={previewThumbs}>
                        <GridTile key={previewItem.thumb}><img src={previewItem.thumb} /></GridTile>
                      </For>
                    </GridList>
                  </CardText>
                </If>
                <div className="EventPage-main-gallery-actions">
                  <RaisedButton
                    label={galleryIsVisible ? 'Fechar Galeria' : 'Abrir Galeria'}
                    onClick={this.toggleGallery}
                    secondary
                  />
                </div>
                <If condition={galleryIsVisible}>
                  <CardText className="EventPage-main-gallery-photos">
                    <GridList cellHeight="auto">
                      <For each="photosItem" of={photos} index="index">
                        <GridTile key={index}>
                          <img src={photosItem.thumb} onClick={() => this.openPhoto(index)} />
                        </GridTile>
                      </For>
                    </GridList>
                  </CardText>
                </If>
              </Card>
            </If>
            <Card className="EventPage-main-details" initiallyExpanded>
              <CardHeader
                className="EventPage-main-details-title"
                title="Detalhes"
                actAsExpander={isMobile}
                showExpandableButton={isMobile}
                avatar={
                  <Avatar icon={<ActionEvent />} backgroundColor={deepOrange500} size={30} />
                }
              />
              <CardText expandable>
                <List className="EventPage-main-details-info">
                  <If condition={start}>
                    <ListItem
                      disabled
                      primaryText={fullDateFormat(start)}
                      leftIcon={<ActionDateRange />}
                    />
                    <ListItem
                      disabled
                      primaryText={timeFormat(start)}
                      leftIcon={<ActionSchedule />}
                    />
                  </If>
                  <If condition={place && place.address}>
                    <ListItem
                      disabled
                      primaryText={place.address}
                      leftIcon={<MapsPlace />}
                    />
                    <If condition={directions}>
                      <div className="EventPage-main-details-info-button">
                        <FlatButton
                          label="Ver Mapa"
                          secondary
                          containerElement={<Link to="map" smooth offset={-200} duration={500} />}
                        />
                      </div>
                    </If>
                  </If>
                </List>
              </CardText>
            </Card>
            <Card className="EventPage-main-prices" initiallyExpanded>
              <CardHeader
                className="EventPage-main-prices-title"
                title="Preços"
                actAsExpander={isMobile}
                showExpandableButton={isMobile}
                avatar={
                  <Avatar icon={<EditorAttachMoney />} backgroundColor={lightBlue500} size={30} />
                }
              />
              <CardText expandable>
                <List className="EventPage-main-prices-info">
                  <For each="priceItem" of={mappedPrice}>
                    <ListItem
                      disabled
                      key={`${priceItem.description}${priceItem.value}`}
                      primaryText={priceItem.description || 'Entrada'}
                      secondaryText={priceItem.value ? `R$ ${priceItem.value}` : ''}
                    />
                  </For>
                </List>
              </CardText>
            </Card>
            <Card className="EventPage-main-description" initiallyExpanded>
              <CardHeader
                className="EventPage-main-description-title"
                title="Descrição"
                actAsExpander={isMobile}
                showExpandableButton={isMobile}
                avatar={
                  <Avatar icon={<ActionDescription />} backgroundColor={amber500} size={30} />
                }
              />
              <CardText expandable>
                <div
                  className="EventPage-main-description-info"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </CardText>
            </Card>
            <If condition={directions}>
              <Card className="EventPage-main-map" name="map" initiallyExpanded>
                <CardHeader
                  className="EventPage-main-map-title"
                  title="Mapa"
                  actAsExpander={isMobile}
                  showExpandableButton={isMobile}
                  avatar={
                    <Avatar icon={<MapsMap />} backgroundColor={green500} size={30} />
                  }
                />
                <CardText expandable>
                  <Element name="map">
                    <Wrapper center={directions} />
                  </Element>
                </CardText>
              </Card>
            </If>
          </div>

          <div className="EventPage-related">
            <h2>Eventos Relacionados</h2>
            <If condition={categories.length}>
              <EventListArrow
                direction="top"
                onClick={() => this.scroll(-1)}
                hide={hideTopArrow}
              />
              <EventListArrow
                direction="bottom"
                onClick={() => this.scroll(1)}
                hide={hideBottomArrow}
              />
              <EventList
                title=""
                start={moment().startOf('hour')}
                categoryIds={map(categories, 'id')}
                excludedEventId={id}
                vertical={!isMobile}
                inputRef={ dom => this._listDOM = dom }
              />
            </If>
          </div>
        </div>
      </DefaultLayout>
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

