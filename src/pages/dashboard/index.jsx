import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import moment from 'moment';
import { withRouter } from 'react-router';
import { graphql, compose } from 'react-apollo';
import { Button, Typography, Zoom } from 'material-ui';

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
    this.state = { menuIsOpen: false, selectedEvent: {} };
  }

  handleEventClick(event) {
    this.setState({ menuIsOpen: true, selectedEvent: event });
  }

  render() {
    const { viewer = {}, classes, requireLogin } = this.props;
    const { events } = viewer;
    const { menuIsOpen, selectedEvent } = this.state;
    const pid = (viewer && viewer.id) || null;
    const logged = !!pid;

    const newEvent = () => {
      TrackingAPI.track({ name: 'EventTrigger.Clicked', logged, pid });
      logged
        ? this.props.history.push('/evento/novo')
        : requireLogin(() => {
          TrackingAPI.track({ name: 'User.Logged', pid });
          this.props.history.push('/evento/novo');
        })();
    }

    return (
      <Choose>
        <When condition={events && !events.length}>
          <div className={classes.root}>
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
              onClick={newEvent}
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
              vertical={false}
              strict
              counter
              asButtons
              action={this.handleEventClick}
            />
            <div className={classes.stageMenu}>
              <Choose>
                <When condition={menuIsOpen}>
                  <Zoom in={menuIsOpen}>
                    <div>
                      <StageMenu event={selectedEvent} />
                    </div>
                  </Zoom>
                </When>
                <Otherwise>
                  <Typography variant="display1" gutterBottom style={{ textAlign: 'center' }}>
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
  deviceInfo: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  classes: PropTypes.object,
  requireLogin: PropTypes.func,
};

const injectData = graphql(query, {
  options: () => ({ variables: { start: moment().startOf('day') } }),
  props: ({ data: { viewer }, ownProps: { location } }) => ({ viewer, location }),
});

export default compose(
  injectData,
  withIndexStyle,
  withInfo(['deviceInfo']),
  withRouter,
  withAuth,
)(Dashboard);
