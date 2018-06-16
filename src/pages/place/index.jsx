import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { graphql, compose } from 'react-apollo';
import { map } from 'lodash';
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
import Wrapper from '~/src/components/map';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import { withInfo } from '~/src/hocs';

import query from './graphql';
import { withIndexStyle } from './styles';

export class PlacePage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillReceiveProps({ viewer }) {
    TrackingAPI.viewerSafeTrack(viewer, 'PlacePage.Viewed');
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


  render() {
    const { place: prePlace } = this.props.location.state || {};
    const { viewer = {}, place = prePlace, classes } = this.props;
    const {
      id,
      name,
      address,
      city,
      avatar,
      description,
      contact = {},
      coordinates = [],
      categories = [],
      photos = [],
    } = place || {};
    const backgroundAlt = `Imagem de Fundo do ${name}`;
    const coordinatesObj = coordinates && { lat: coordinates[1], lng: coordinates[0] };

    declare var category;


    return (
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12} sm={12} md={9}>
          <Card className={classes.card} >
            <CardMedia  className={classes.media} image="" title={name} alt={backgroundAlt}>
              <Paper className={classes.avatar} />
              <Typography className={classes.title} variant="display1" component="h1">
                {name}
              </Typography>
            </CardMedia>
            <CardContent>
              <div>
                <For each="category" of={categories} index="index">
                  <Chip label={category.title} className={classes.chip} key={index} />
                </For>
              </div>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={9} style={{ paddingTop: 8 }}>
                  <List dense>
                    <If condition={address}>
                      <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                          <Icon>place</Icon>
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          className={classes.listItemText}
                          primary={address}
                        />
                      </ListItem>
                    </If>
                    <If condition={viewer.isAdmin}>
                      <ListItem className={classes.listItem}>
                        <Button
                          variant="raised"
                          color="default"
                          className={classes.listButton}
                          href={`/evento/${id}/editar`}
                        >
                          Editar
                          <Icon className={classes.rightIcon}>mode_edit</Icon>
                        </Button>
                      </ListItem>
                    </If>
                  </List>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper className={classes.mapGrid} elevation={1}>
                    <Wrapper mini center={coordinatesObj} centerMarker />
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card className={classes.eventsCard} />
        </Grid>
      </Grid>
    );
  }
}

PlacePage.propTypes = {
  classes: PropTypes.object,
  place: PropTypes.object,
  viewer: PropTypes.object,
  deviceInfo: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

const injectData = graphql(query, {
  options: ({ match }) => ({ variables: { id: match.params.id } }),
  props: ({ data: { place }, ownProps: { location } }) => ({ place, location }),
});

export default compose(
  withRouter,
  injectData,
  withIndexStyle,
  withInfo(['viewer', 'deviceInfo']),
)(PlacePage);
