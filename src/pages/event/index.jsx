import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { graphql, compose } from 'react-apollo';
import Lightbox from 'react-images';
import { map } from 'lodash';
import moment from 'moment';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  ExpansionPanel,
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

import autoBind from 'react-autobind';

import EventList from '~/src/components/event-list';
import Calendar from '~/src/components/calendar';
import Wrapper from '~/src/components/map';
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
    TrackingAPI.viewerSafeTrack(viewer, 'EventPage.Viewed');
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
        TrackingAPI.viewerSafeTrack(this.props.viewer, 'ShareTrigger.Clicked');
      }
    });
  }

  placeProfile() {
    const { event: preEvent } = this.props.location.state || {};
    const { event = preEvent, history } = this.props;
    const { place } = event || {};

    history.push({ pathname: `/local/${place.id}`, state: { place } });
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
      status,
    } = event || {};
    const flyerAlt = `Flyer do ${title || 'evento'}`;
    const mappedPrice = price ? [{ value: price }] : prices;
    const isMobile = !this.props.deviceInfo.is('desktop');
    const startMoment = moment(start);
    const coordinates =
      place
      && place.coordinates
      && { lat: place.coordinates[1], lng: place.coordinates[0] };

    declare var index;
    declare var priceItem;
    declare var photosItem;
    declare var category;

    return (
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12} sm={12} md={9}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={flyer}
              title={title}
              alt={flyerAlt}
            />
            <CardContent>
              <Calendar className={classes.calendar} date={startMoment} />
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
              <div className={classes.chipList}>
                <For each="category" of={categories} index="index">
                  <Chip label={category.title} className={classes.chip} key={index} />
                </For>
              </div>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={9} style={{ paddingTop: 8 }}>
                  <List dense>
                    <If condition={place}>
                      <If condition={place.name}>
                        <ListItem className={classes.listItemPlace}>
                          <Choose>
                            <When condition={place.logo}>
                              <Avatar alt={`perfil ${place.name}`} src={place.logo} />
                            </When>
                            <Otherwise>
                              <Avatar
                                className={classes.listItemPlaceAvatar}
                                alt={`perfil ${place.name}`}
                              >
                                {place.name[0]}
                              </Avatar>
                            </Otherwise>
                          </Choose>
                          <ListItemText
                            disableTypography
                            className={classes.listItemText}
                            primary={place.name}
                          />
                          <Button
                            className={classes.listItemPlaceButton}
                            color="secondary"
                            onClick={this.placeProfile}
                          >
                            ver perfil
                          </Button>
                        </ListItem>
                      </If>
                      <If condition={place.address}>
                        <ListItem className={classes.listItem}>
                          <ListItemIcon className={classes.listItemIcon}>
                            <Icon>place</Icon>
                          </ListItemIcon>
                          <ListItemText
                            disableTypography
                            className={classes.listItemText}
                            primary={place.address}
                          />
                        </ListItem>
                      </If>
                    </If>
                    <If condition={start}>
                      <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                          <Icon>event</Icon>
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          className={classes.listItemText}
                          primary={fullDateFormat(start)}
                        />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                          <Icon>schedule</Icon>
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          className={classes.listItemText}
                          primary={timeFormat(start)}
                        />
                      </ListItem>
                    </If>
                    <If condition={viewer.isAdmin}>
                      <ListSubheader className={classes.listSubheader} component="div">
                        Moderação
                      </ListSubheader>
                      <ListItem className={classes.listItem}>
                        {this.renderModerationButtons()}
                      </ListItem>
                    </If>
                    <ListItem className={classes.listItem}>
                      <If condition={!viewer.isAdmin && status == 'ACTIVE'}>
                        <AttendButton eventId={id} />
                        <Button
                          className={classes.listButton}
                          onClick={this.fbShare}
                          variant="raised"
                          color="default"
                        >
                          Compartilhar
                          <Icon className={classes.rightIcon}>share</Icon>
                        </Button>
                      </If>
                      <If condition={viewer.isAdmin || creator.id === viewer.id}>
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
                  </List>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Paper className={classes.mapGrid} elevation={1}>
                    <Wrapper mini center={coordinates} centerMarker />
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
            <Divider light />
            <CardContent style={{ paddingRight: 8, paddingLeft: 8 }}>
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
                <Grid item sm={12} md={6} />
              </Grid>
            </CardContent>
            <Divider light />
            <CardContent style={{ paddingRight: 24, paddingLeft: 24 }}>
              <Typography variant="body2" style={{ paddingBottom: 8 }}>
                Descrição
              </Typography>
              <Typography align="inherit" component="div">
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <If condition={categories.length}>
          <Grid item xs={12} sm={12} md={3}>
            <Card className={classes.eventsCard}>
              <EventList
                title="Eventos Relacionados"
                vertical={!isMobile}
                relatedTo={id}
                start={moment()}
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
  classes: PropTypes.object,
  history: PropTypes.object,
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
  withRouter,
  injectData,
  injectSetEventStatusMutation,
  withIndexStyle,
  withInfo(['viewer', 'deviceInfo']),
)(EventPage);
