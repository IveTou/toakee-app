import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { closeDashboard } from '~/src/toakee-core/ducks/dashboard';
import { fetchGuestLists } from '~/src/toakee-core/ducks/guest-lists';
import { fetchInvitations, changeInvitationsFilter } from '~/src/toakee-core/ducks/invitations';

import Header from '~/src/components/header';
import EventGuestListItem from './item';

if (process.env.BROWSER) {
  require('./style.scss');
}

class EventGuestList extends React.Component {
  componentWillMount() {
    const { slug } = this.props.router.params;
    const { selectedEvent, dispatch } = this.props;
    const params = selectedEvent
      ? { eventId: selectedEvent.id }
      : { eventSlug: slug };

    dispatch(fetchInvitations(params));
    dispatch(fetchGuestLists(params));
    dispatch(closeDashboard());
  }

  render() {
    const { invitations, filter, selectedEvent, dispatch } = this.props;

    const total = invitations.size;
    const filterRegex = new RegExp(
      `\\b${filter.trim().replace(/\s+/, '[\\s\\S]*\\s')}`,
      'i',
    );

    const confirmed = invitations
      .filter(({ status }) => status === 'ATTENDED')
      .size;

    const list = total
      ? invitations
          .filter(({ normalizedName }) => normalizedName.match(filterRegex))
          .sort(({ normalizedName: a }, { normalizedName: b }) => (
            a.match(filterRegex).index - b.match(filterRegex).index
            || a < b ? -1 : 1
          ))
          .toList()
      : [];

    declare var invitation;
    declare var idx;

    return (
      <div className="EventGuestList">
        <Header title={selectedEvent && selectedEvent.title} />
        <div className="EventGuestList-filters">
          <div className="EventGuestList-filters-input">
            <input
              placeholder="Quem você deseja buscar na lista?"
              onChange={e => dispatch(changeInvitationsFilter(e.target.value))}
              type="text"
            />
            <i className="fa fa-search" />
          </div>
          <div className="EventGuestList-filters-summary">
            <span className="EventGuestList-filters-summary-total">
              <b>Nomes na lista:</b> {total}
            </span>
            <span className="EventGuestList-filters-summary-separator"> | </span>
            <span className="EventGuestList-filters-summary-confirmed">
              <b>Confirmados:</b> {confirmed}
            </span>
          </div>
        </div>
        <div className="EventGuestList-list">
          <For each="invitation" index="idx" of={list}>
            <EventGuestListItem
              key={idx}
              shadow={list[idx + 1] && list[idx + 1].status === 'INVITED'}
              {...invitation}
            />
          </For>
        </div>
      </div>
    );
  }
}

EventGuestList.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  invitations: PropTypes.object,
  selectedEvent: PropTypes.object,
  filter: PropTypes.string,
};

export default connect(({ invitations, events }, { selectedEvent = {} }) => ({
  invitations: invitations.get('data').filter(i => i.eventId === selectedEvent.id),
  filter: invitations.get('filter'),
}))(EventGuestList);
