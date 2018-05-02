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

import { withIndexStyle } from './styles';

export class VenuePage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillReceiveProps({ viewer }) {
    TrackingAPI.viewerSafeTrack(viewer, 'VenuePage.Viewed');
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
    const { place = prePlace, classes } = this.props;
    const {
      id,
      name,
      coordinates,
      address,
      city,
    } = place || {};

    return (
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12} sm={12} md={9}>
          <Card className={classes.card} >
            <CardMedia  className={classes.media}>
              <Paper className={classes.avatar}/>
            </CardMedia>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card className={classes.eventsCard}>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

VenuePage.propTypes = {
  classes: PropTypes.object,
  place: PropTypes.object,
  viewer: PropTypes.object,
  setStatus: PropTypes.func,
  deviceInfo: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default compose(
  withRouter,
  withIndexStyle,
  withInfo(['viewer', 'deviceInfo']),
)(VenuePage);
