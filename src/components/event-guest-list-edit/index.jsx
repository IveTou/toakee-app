import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { injectState } from 'freactal';

import { closeDashboard } from '~/src/toakee-core/ducks/dashboard';
import { fetchGuestLists } from '~/src/toakee-core/ducks/guest-lists';
import { fetchInvitations } from '~/src/toakee-core/ducks/invitations';

import Header from '~/src/components/header';
import EventGuestListEditItem from './item';
import EventGuestListEditNewItem from './new-item';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var guestList;

class EventGuestListEdit extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    const { slug } = this.props.router.params;
    const { event, dispatch } = this.props;
    const params = event
      ? { eventId: event.id }
      : { eventSlug: slug };

    dispatch(fetchInvitations(params));
    dispatch(fetchGuestLists(params));
    dispatch(closeDashboard());
  }

  render() {
    const { selectedEvent, guestLists, dispatch } = this.props;
    window.guestLists = guestLists;

    return (
      <div className="EventGuestListEdit">
        <Header title="Gerenciar listas" />
        <div className="EventGuestListEdit-lists">
          <If condition={selectedEvent}>
            <EventGuestListEditNewItem event={selectedEvent} dispatch={dispatch} />
          </If>
          <For each="guestList" of={guestLists}>
            <EventGuestListEditItem key={guestList.id} {...guestList} />
          </For>
        </div>
      </div>
    );
  }
}

EventGuestListEdit.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  event: PropTypes.object,
  guestLists: PropTypes.object,
  selectedEvent: PropTypes.object,
};

export default connect(({ guestLists, events }, { selectedEvent = {} }) => ({
  guestLists: guestLists.get('data').filter(g => g.eventId === selectedEvent.id).toList(),
}))(injectState(EventGuestListEdit));
