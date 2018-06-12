import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import moment from 'moment';
import { withRouter } from 'react-router';
import { graphql, compose } from 'react-apollo';
import { Avatar, Button, Icon, Typography, Zoom } from 'material-ui';

import EventList from '~/src/components/event-list';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import { withInfo } from '~/src/hocs';
import { withAuth } from '~/src/components/auth-modal/hoc';

import StageMenu from './stageMenu';
import query from './graphql';
import { withIndexStyle } from './styles';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { selectedEvent: null };
  }

  handleEventClick(selectedEvent) {
    this.setState({ selectedEvent });
  }

  render() {
    const { viewer = {}, classes, requireLogin } = this.props;
    const { eventCount } = viewer;
    const { selectedEvent } = this.state;
    const pid = (viewer && viewer.id) || null;
    const logged = !!pid;

    const createEvent = () => {
      TrackingAPI.track({ name: 'EventTrigger.Clicked', logged, pid });
      requireLogin(() => {
        TrackingAPI.track({ name: 'User.Logged', pid });
        this.props.history.push('/evento/novo');
      })();
    }

    return (
      <Choose>
        <When condition={!eventCount}>
          <div className={classes.root}>
            <Avatar className={classes.avatar}>
              <Icon className={classes.icon}>event</Icon>
            </Avatar>
            <Typography variant="headline" gutterBottom>
              Ainda não há eventos criados no seu perfil
            </Typography>
            <Typography className={classes.caption} variant="subheading" gutterBottom>
              Que tal criar um agora? É muito facil!
            </Typography>
            <Button
              className={classes.publishButton}
              variant="raised"
              color="primary"
              onClick={createEvent}
            >
              Criar Evento
            </Button>
          </div>
        </When>
        <Otherwise>
          <div className={classes.rootStage}>
            <EventList
              title="Eventos futuros"
              start={moment().add(1, 'day').startOf('day')}
              strict
              counter
              asButtons
              onEventClicked={this.handleEventClick}
            />
            <div className={classes.stageMenu}>
              <Choose>
                <When condition={!!selectedEvent}>
                  <Zoom in={!!selectedEvent}>
                    <div>
                      <StageMenu event={selectedEvent} />
                    </div>
                  </Zoom>
                </When>
                <Otherwise>
                  <Avatar className={classes.avatar}>
                    <Icon className={classes.icon}>touch_app</Icon>
                  </Avatar>
                  <Typography
                    className={classes.messageCentered}
                    variant="display1"
                    gutterBottom
                  >
                    Clique em um evento acima para gerenciar.
                  </Typography>
                </Otherwise>
              </Choose>
            </div>
          </div>
        </Otherwise>
      </Choose>
    );
  }
}

Dashboard.propTypes = {
  viewer: PropTypes.object,
  history: PropTypes.object,
  classes: PropTypes.object,
  requireLogin: PropTypes.func,
};

const injectData = graphql(query, {
  options: () => ({ variables: { start: moment().startOf('day') } }),
  props: ({ data: { viewer } }) => ({ viewer }),
});

export default compose(
  injectData,
  withIndexStyle,
  withInfo(['deviceInfo']),
  withRouter,
  withAuth,
)(Dashboard);
