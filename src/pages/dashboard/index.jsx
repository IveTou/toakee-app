import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import moment from 'moment';

import EventList from '~/src/components/event-list';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { counter: 0 };
  }

  setCounter(dataFromChild) {
    this.setState({ counter: dataFromChild });
  }

  render() {
    console.log(this.state.counter);
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

export default Dashboard;
