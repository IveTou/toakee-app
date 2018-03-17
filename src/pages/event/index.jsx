import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Lightbox from 'react-images';
import { take, map } from 'lodash';
import moment from 'moment';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Icon,
  Grid,
  GridList,
  GridListTile,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from 'material-ui';

import classNames from 'classnames';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';

import EventList from '~/src/components/event-list';
import Calendar from '~/src/components/calendar';
import Wrapper, { Map } from '~/src/components/map';
import AttendButton from '~/src/components/attend-button';
import { fullDateFormat, timeFormat } from '~/src/utils/moment';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import { withInfo } from '~/src/hocs';

import query, { setEventStatusMutation } from './graphql';
import { withIndexStyle } from './styles';

export class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      galleryIsOpen: false,
    };
    autoBind(this);
  }

  componentWillReceiveProps({ viewer }) {
    TrackingAPI.viewerSafeTrack(viewer, 'Event Page View');
  }

  toggleGallery(event, expanded) {
    this.setState({ galleryIsOpen: expanded });
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
        key={label}
        disabled={status === eventStatus}
        className={this.props.classes.listButton}
        onClick={() => setStatus(status)}
      >
        {label}
      </Button>
    ));
  }

  render() {
    const { event: preEvent } = this.props.location.state || {};
    const { galleryIsOpen } = this.state;
    const { viewer = {}, event = preEvent, classes } = this.props;
    const {
      id,
      title,
      description,
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
    const startMoment = moment(start);
    const coordinates = place && place.coordinates
      ? { lat: place.coordinates[0], lng: place.coordinates[1] }
      : undefined;

    declare var index;
    declare var priceItem;
    declare var photosItem;

    return (
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12} sm={12} md={9}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={flyer}
              title={title}
            />
            <CardContent>
              <Calendar
                className={classes.calendar}
                date={startMoment}
                monthVariant="title"
                dayVariant="display1"
              />
              <Typography className={classes.title} variant="display1" component="h1">
                {title}
              </Typography>

              <If condition={photos.length}>
                <Lightbox
                  images={photos.map(({ src }) => ({ src }))}
                  isOpen={this.state.lightboxIsOpen}
                  onClickPrev={this.handleClickPrev}
                  onClickNext={this.handleClickNext}
                  onClose={this.closeLightBox}
                  currentImage={this.state.currentImage}
                />
                <ExpansionPanel className={classes.galleryRoot} onChange={this.toggleGallery}>
                  <ExpansionPanelSummary
                    className={classes.galleryTitle}
                    expandIcon={<Icon style={{ color: "white" }}>expand_more</Icon>}
                  >
                    <If condition={!galleryIsOpen}>
                      <Typography variant="title" color="inherit">
                        Clique e veja como foi!
                      </Typography>
                    </If>
                    <If condition={galleryIsOpen}>
                      <Typography variant="title" color="inherit">Galeria de Fotos</Typography>
                    </If>
                  </ExpansionPanelSummary>
                    <If condition={galleryIsOpen}>
                      <div className={classes.gridList}>
                        <GridList cellHeight={144} style={{ height: 336 }} cols={3}>
                          <For each="photosItem" of={photos} index="index">
                            <GridListTile key={index} cols={1}>
                              <img src={photosItem.thumb} onClick={() => this.openPhoto(index)} />
                            </GridListTile>
                          </For>
                        </GridList>
                      </div>
                    </If>
                </ExpansionPanel>
              </If>
              <Divider light />
              <Grid container spacing={8}>
                <Grid item xs={12} sm={9} style={{ paddingTop: 8 }}>
                  <List dense>
                    <If condition={place && place.address}>
                      <ListItem className={classes.listItem}>
                        <ListItemIcon>
                          <Icon>place</Icon>
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          className={classes.listItemText}
                          primary={place.address}
                        />
                      </ListItem>
                    </If>
                    <If condition={start}>
                      <ListItem className={classes.listItem}>
                        <ListItemIcon>
                          <Icon>event</Icon>
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          className={classes.listItemText}
                          primary={fullDateFormat(start)}
                        />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemIcon>
                          <Icon>schedule</Icon>
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          className={classes.listItemText}
                          primary={timeFormat(start)}
                        />
                      </ListItem>
                    </If>
                    <Choose>
                      <When condition={viewer.isAdmin}>
                        <ListSubheader className={classes.listSubheader} component="div">
                          Moderação
                        </ListSubheader>
                        <ListItem>{this.renderModerationButtons()}</ListItem>
                      </When>
                      <Otherwise>
                        <ListItem className={classes.lisItem}>
                          <AttendButton className={classes.listButton} eventId={id} />
                          <Button
                            className={classes.listButton}
                            onClick={this.fbShare}
                            variant="raised"
                            color="default"
                          >
                            Compartilhar
                            <Icon className={classes.rightIcon}>share</Icon>
                          </Button>
                          <If condition={creator.id === viewer.id}>
                            <Button
                              variant="raised"
                              color="default"
                              className={classes.listButton}
                              href={`/evento/${id}/editar`}
                            >
                              Editar
                              <Icon className={classes.rightIcon}>mode_edit</Icon>
                            </Button>
                          </If>
                        </ListItem>
                      </Otherwise>
                    </Choose>
                  </List>
                </Grid>

                <Grid className={classes.mapGrid} item xs={12} sm={3}>
                  <Paper elevation={1}>
                    <Wrapper mini center={coordinates} centerMarker />
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
            <Divider light />
            <CardContent>
              <Grid container spacing={8}>
                <Grid item sm={12} md={6} style={{ width: '100%' }}>
                  <GridList cellHeight="auto">
                    <For each="priceItem" of={mappedPrice}>
                      <GridListTile
                        key={`${priceItem.description}${priceItem.value}`}
                      >
                        <ListItemText
                          style={{ paddingLeft: 16 }}
                          primary={priceItem.description || 'Entrada'}
                          secondary={priceItem.value ? `R$ ${priceItem.value}` : ''}
                        />
                      </GridListTile>
                    </For>
                  </GridList>
                </Grid>
                <Grid item sm={12} md={6}>
                </Grid>
              </Grid>
            </CardContent>
            <Divider light />
            <CardContent style={{ paddingRight: 32, paddingLeft: 32 }}>
              <Typography variant="body2" style={{ paddingBottom: 8 }}>
                Descrição
              </Typography>
              <Typography
                align="inherit"
                component="div"
                children={<div dangerouslySetInnerHTML={{ __html: description }} />}
              />
            </CardContent>
          </Card>
        </Grid>
        <If condition={categories.length}>
          <Grid item xs={12} sm={12} md={3}>
            <Card className={classes.eventsCard}>
              <EventList
                title="Eventos Relacionados"
                vertical={!isMobile}
                excludedEventId={id}
                start={moment().startOf('day')}
                end={moment().endOf('day')}
                categoryIds={map(categories, 'id')}
                limit={5}
              />
            </Card>
          </Grid>
        </If>
      </Grid>
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
  withIndexStyle,
  withInfo(['viewer', 'deviceInfo']),
)(EventPage);
