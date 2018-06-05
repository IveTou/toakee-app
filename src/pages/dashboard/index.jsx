import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import moment from 'moment';
import { graphql, compose } from 'react-apollo';
import query from './graphql';

import EventList from '~/src/components/event-list';
import { withInfo } from '~/src/hocs';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { viewer } = this.props;
    const { id } = viewer;
    console.log(this.props);

    return (
      <div>
        <EventList
          title="Eventos futuros"
          start={moment().add(1, 'day').startOf('day')}
          vertical={false}
          getCount={this.setCounter}
          strict
          counter
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  viewer: PropTypes.object,
  deviceInfo: PropTypes.object,
  profile: PropTypes.object,
  location: PropTypes.object,
};

const injectData = graphql(query, {
  options: ({ match }) => ({ variables: { id: match.params.id } }),
  props: ({ data: { profile }, ownProps: { location } }) => ({ profile, location }),
});

export default compose(
  injectData,
  withInfo(['viewer', 'deviceInfo']),
)(Dashboard);
