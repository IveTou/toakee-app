import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Grid, Icon, List, ListItem, Paper, Typography } from 'material-ui';
import { green, lightBlue } from 'material-ui/colors';

import Calendar from '~/src/components/calendar';

import { withStageMenuStyle } from './styles';

const StageMenu = ({ event, classes }) => {
  const { id, title, start, flyer } = event;
  const startMoment = moment(start);

  return(
    <Paper elevation={4} className={classes.root}>
      <Grid container spacing={0} style={{ height: '100%' }}>
        <Grid className={classes.flyer} item xs={4}>
          <div
            className={classes.flyerImage}
            alt={`flyer do ${title}`}
            style={{ backgroundImage: `url("${flyer}")` }}
          />
        </Grid>
        <Grid className={classes.menu} item xs={8}>
          <Calendar className={classes.calendar} date={startMoment} />
          <Typography className={classes.title} variant="display1" component="h1">
            {title}
          </Typography>
          <List>
            <ListItem className={classes.listItem}>
              <Paper className={classes.iconCanvas} style={{ backgroundColor: lightBlue[500] }}>
                <Icon className={classes.icon} style={{ fontSize: 36 }}>accessibility_new</Icon>
              </Paper>
              <div className={classes.itemInfo}>
                <div>
                  <Typography className={classes.itemInfoTitle} align="center" variant="body2">
                    confirmados
                  </Typography>
                  <Typography align="center" variant="headline">32</Typography>
                </div>
                <Button className={classes.button} component="span" size="large">
                  Portaria
                </Button>
              </div>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Paper className={classes.iconCanvas} style={{ backgroundColor: green[500] }}>
                <Icon className={classes.icon} style={{ fontSize: 36 }}>loyalty</Icon>
              </Paper>
              <div className={classes.itemInfo}>
                <div>
                  <Typography className={classes.itemInfoTitle} align="center" variant="body2">
                    listas de desconto
                  </Typography>
                  <Typography align="center" variant="headline">6</Typography>
                </div>
                <Button className={classes.button} component="span" size="large">
                  Ver Lista
                </Button>
              </div>
            </ListItem>
            <ListItem
              className={classes.listItem}
              style={{ marginTop: 24, justifyContent: 'flex-end' }}
            >
              <Button
                variant="raised"
                color="default"
                className={classes.button}
                href={`/evento/${id}/editar`}
              >
                Editar
                <Icon className={classes.rightIcon}>mode_edit</Icon>
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}

StageMenu.propTypes = {
  event: PropTypes.object,
  classes: PropTypes.object,
};

export default withStageMenuStyle(StageMenu);
