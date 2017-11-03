import React, { PropTypes } from 'react';
import { graphql, compose } from 'react-apollo';
import { Icon, Card, Image, Grid, Button } from 'semantic-ui-react';
import Lightbox from 'react-images';
import classNames from 'classnames';
import autoBind from 'react-autobind';

import DefaultLayout from '~/src/layouts/default';
import { fullDateFormat, timeFormat, dateFormat } from '~/src/utils/moment';
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
      galleryIsVisible: false,
      currentImage: 0,
      loadGallery: false,
    };
    autoBind(this);
  }

  componentWillReceiveProps({ viewer }) {
    TrackingAPI.viewerSafeTrack(viewer, 'Event Page View');
  }

  toggleGallery() {
    if (!this.props.deviceInfo.is('desktop')) {
      this.props.history.push(`/evento/${this.props.event.id}/fotos`);
    } else {
      const { galleryIsVisible } = this.state;

      this.setState({
        loadGallery: true,
        galleryIsVisible: !galleryIsVisible,
      }, () => { window.scrollTo(0, 0); });
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
      { label: 'Esconder', color: 'blue', status: 'PENDING' },
      { label: 'Reprovar', color: 'red', status: 'REPROVED' },
      { label: 'Aprovar', color: 'green', status: 'ACTIVE' },
    ];

    return buttonProps.map(({ label, color, status }) => (
      <Button
        key={label}
        color={color}
        basic={status !== eventStatus}
        onClick={() => setStatus(status)}
      >
        {label}
      </Button>
    ));
  }

  render() {
    const { event: preEvent } = this.props.location.state || {};
    const { galleryIsVisible, loadGallery } = this.state;
    const { viewer = {}, event = preEvent } = this.props;
    const {
      title,
      description,
      place,
      start,
      flyer,
      price,
      prices = [],
      photos = [],
    } = event || {};
    const flyerAlt = `Flyer do ${title || 'evento'}`;

    const classes = classNames('EventPage', { 'EventPage--viewGallery': galleryIsVisible });

    declare var image;
    declare var index;

    return (
      <DefaultLayout title={title}>
        <Grid columns={2} className={classes}>
          <Grid.Column className="EventPage-gallery" mobile={16} tablet={8} computer={8}>
            <Lightbox
              images={photos.map(({ src }) => ({ src }))}
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
                    style={{ backgroundImage: `url(${image.thumb})` }}
                    onClick={() => this.openPhoto(index)}
                  />
                </For>
              </Image.Group>
            </If>
          </Grid.Column>


          <Grid.Column className="EventPage-details" mobile={16} tablet={8} computer={8}>
            <div
              itemScope
              itemType="http://schema.org/Event"
              itemRef="_startDate2 _image7 _description8 _offers9"
              className="EventPage-details-header"
            >
              <h1 itemProp="name" className="EventPage-details-header-title">
                {title}
              </h1>
              <span
                itemProp="location"
                itemScope
                itemType="http://schema.org/Place"
                itemRef="_address5"
              >
                <If condition={place}>
                  <div itemProp="name" className="EventPage-details-header-place">
                    {place.name}
                  </div>
                </If>
              </span>
            </div>

            <div className="EventPage-details-info">
              <If condition={start}>
                <div className="EventPage-details-info-item">
                  <Icon name="calendar" />
                  <span>
                    <meta id="_startDate2" itemProp="startDate" content={dateFormat(start)} />
                    {fullDateFormat(start)}
                  </span>
                </div>
                <div className="EventPage-details-info-item">
                  <Icon name="clock" />
                  <span>{timeFormat(start)}</span>
                </div>
              </If>
              <If condition={place && place.address}>
                <div
                  id="_address5"
                  itemProp="address"
                  itemScope
                  itemType="http://schema.org/PostalAddress"
                  className="EventPage-details-info-item"
                >
                  <Icon name="marker" />
                  <span itemProp="streetAddress">{place.address}</span>
                </div>
              </If>
              <If condition={price || (prices && !!prices.length)}>
                <div
                  id="_offers9"
                  itemProp="offers"
                  itemScope
                  itemType="http://schema.org/Offer"
                  className="EventPage-details-info-item"
                >
                  <Icon name="dollar" />
                  <span itemProp="price">
                    {price || prices.map(p => `${p.description}: ${p.value}`).join(' | ')}
                  </span>
                </div>
              </If>
              <div className="EventPage-details-info-social">
                <Button
                  onClick={this.fbShare}
                  color="facebook"
                  size="small"
                  content="Compartilhar"
                  icon="share"
                />
              </div>
            </div>

            <div className="EventPage-details-body">
              <div className="EventPage-details-body-description">
                <div className="EventPage-details-body-title">Descrição</div>
                <div
                  id="_description8"
                  itemProp="description"
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
              <If condition={flyer}>
                <Image
                  id="_image7"
                  itemProp="image"
                  alt={flyerAlt}
                  className="EventPage-flyer-img"
                  src={flyer}
                />
              </If>
              <If condition={viewer.isAdmin}>
                <Button.Group>{this.renderModerationButtons()}</Button.Group>
              </If>
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
  event: PropTypes.object,
  viewer: PropTypes.object,
  history: PropTypes.object,
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

