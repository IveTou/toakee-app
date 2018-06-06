import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import moment from 'moment';
import { withRouter } from 'react-router';
import { graphql, compose } from 'react-apollo';
import { Button, Typography } from 'material-ui';

import EventList from '~/src/components/event-list';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import { withInfo } from '~/src/hocs';
import { withAuth } from '~/src/components/auth-modal/hoc';

import query from './graphql';
import { withIndexStyle } from './styles';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { viewer = {}, classes, requireLogin } = this.props;
    const { events } = viewer;
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
      <div className={classes.root}>
        <Choose>
          <When condition={events && !events.length}>
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
          </When>
          <Otherwise>
            <EventList
              title="Eventos futuros"
              start={moment().add(1, 'day').startOf('day')}
              vertical={false}
              strict
              counter
            />
          </Otherwise>
        </Choose>
      </div>
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
