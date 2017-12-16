import React, { PropTypes } from 'react';
import  Wrapper from '~/src/components/map';
import { graphql, compose } from 'react-apollo';
import {
  Card,
  CardMedia,
  CardText,
  CardTitle,
  FlatButton,
  List,
  ListItem,
} from 'material-ui';
import { ActionDateRange, ActionSchedule, SocialShare } from 'material-ui/svg-icons';
import { white } from 'material-ui/styles/colors';
import classNames from 'classnames';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';

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
      status,
    } = event || {};
    const flyerAlt = `Flyer do ${title || 'evento'}`;
    const mappedPrice = price || prices.length === 1 ? price || prices[0].value : prices;

    const classes = classNames('EventPage', { 'EventPage--viewGallery': galleryIsVisible });

    declare var image;
    declare var index;
    declare var priceItem;

    return (
      <DefaultLayout title={title}>
        <div className="EventPage">
          <div className="EventPage-main">
            <Card>
              <CardMedia className="EventPage-main-flyer" alt={flyerAlt}>
                <div
                  className="EventPage-main-flyer-bg"
                  style={{backgroundImage: `url(${flyer})`}}
                />
                <div className="EventPage-main-flyer-overlay">
                  <div className="EventPage-main-flyer-overlay-title">
                    <h1>{title}</h1>
                  </div>
                  <div className="EventPage-main-flyer-overlay-actions">
                    <FlatButton
                      label="compartilhar"
                      labelPosition="before"
                      primary={true}
                      icon={<SocialShare color={white} />}
                    />
                  </div>
                </div>
              </CardMedia>
            </Card>
            <Card className="EventPage-main-details" initiallyExpanded>
              <CardTitle
                className="EventPage-main-details-title"
                title="Detalhes"
                actAsExpander
                showExpandableButton
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
                      leftIcon={<ActionDateRange />}
                    />
                    <div className="EventPage-main-details-info-button">
                      <FlatButton label="Ver Mapa" secondary />
                    </div>
                  </If>
                </List>
              </CardText>
            </Card>
            <Card className="EventPage-main-prices" initiallyExpanded>
              <CardTitle
                className="EventPage-main-prices-title"
                title="Preços"
                actAsExpander
                showExpandableButton
              />
              <CardText expandable={true}>
                <List className="EventPage-main-prices-info">
                <Choose>
                  <When condition={Array.isArray(mappedPrice)}>
                    <For each="priceItem" of={mappedPrice}>
                      <ListItem
                        disabled
                        key={`${priceItem.description}${priceItem.value}`}
                        primaryText={`${priceItem.description}`}
                        secondaryText={`R$ ${priceItem.value}`}
                      />
                    </For>
                  </When>
                  <Otherwise>
                    <ListItem disabled primaryText={mappedPrice} />
                  </Otherwise>
                  </Choose>
                </List>
              </CardText>
            </Card>
            <Card className="EventPage-main-description" initiallyExpanded>
              <CardTitle
                className="EventPage-main-description-title"
                title="Descrição"
                actAsExpander
                showExpandableButton
              />
              <CardText expandable={true}>
                <div
                  className="EventPage-main-description-info"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </CardText>
            </Card>
            <Card className="EventPage-main-map" initiallyExpanded>
              <CardTitle
                className="EventPage-main-map-title"
                title="Mapa"
                actAsExpander
                showExpandableButton
              />
              <If condition={!directions}>
                <CardText expandable={true}>
                  <Wrapper center={directions}/>
                </CardText>
              </If>
            </Card>
          </div>

          <div className="EventPage-related">
          </div>
        </div>
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

