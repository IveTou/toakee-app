import React, { PropTypes } from 'react';
import { graphql, compose } from 'react-apollo';
import { Icon, Card, Image, Grid, Button } from 'semantic-ui-react';
import Lightbox from 'react-images';
import classNames from 'classnames';
import autoBind from 'react-autobind';
import MetaTags from 'react-meta-tags';

import DefaultLayout from '~/src/layouts/default';
import { isLogged } from '~/src/utils/session';
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
      galleryIsVisible: false,
      currentImage: 0,
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
    if (!this.props.deviceInfo.is('desktop')) {
      this.props.history.push(`/evento/${this.props.viewer.events[0].slug}/fotos`);
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
      display: 'popup',
      method: 'share',
      mobile_iframe: true,
      hashtag: '#eutoakee',
      href: location.href,
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
    const { galleryIsVisible, loadGallery } = this.state;
    const { viewer = {}, event = {} } = this.props;
    const {
      title,
      description,
      place,
      start,
      flyer,
      price,
      prices = [],
      photos = [],
    } = event;
    const flyerAlt = `Flyer do ${title || 'evento'}`;

    const classes = classNames('EventPage', { 'EventPage--viewGallery': galleryIsVisible });

    declare var image;
    declare var index;

    return (
      <DefaultLayout>
        <MetaTags>
          <title>{title}</title>
          <meta id="og-title" property="og:title" content={title} />
          <meta id="og-description" name="og:description" content={description} />
          <meta id="og-image" property="og:image" content={flyer} />
          <meta id="og-url" property="og:url" content={location.href} />
        </MetaTags>
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
              <If condition={price || (prices && !!prices.length)}>
                <div className="EventPage-details-info-item">
                  <Icon name="dollar" />
                  <span>
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
};

const injectSetEventStatusMutation = graphql(setEventStatusMutation, {
  props: ({ mutate, ownProps: { event } }) => ({
    setStatus: (status) => {
      const { slug, id: eventId } = event;

      return mutate({
        variables: { eventId, status },
        update: (store, { data: { updateEvent } }) => {
          const data = store.readQuery({ query, variables: { slug } });
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
  options: ({ match }) => ({
    variables: { slug: match.params.slug },
  }),
  props: ({ data: { event } }) => ({ event }),
});

export default compose(
  injectData,
  injectSetEventStatusMutation,
)(withInfo(EventPage, ['viewer', 'deviceInfo']));

