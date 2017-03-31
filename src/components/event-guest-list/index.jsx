import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchGuestLists } from '~/src/toakee-core/ducks/guest-lists';

import { fetchInvitations, changeInvitationsFilter } from '~/src/toakee-core/ducks/invitations';
import { fetchEvents } from '~/src/toakee-core/ducks/events';

import Header from '~/src/components/header';
import EventGuestListItem from './item';

if (process.env.BROWSER) {
  require('./style.scss');
}

class EventGuestList extends React.Component {
  componentWillMount() {
    const { slug } = this.props.router.params;
    const { event, dispatch } = this.props;
    const params = event
      ? { eventId: event.id }
      : { eventSlug: slug };

    dispatch(fetchInvitations(params));
    dispatch(fetchGuestLists(params));
    if (!event) {
      dispatch(fetchEvents(params));
    }
  }

  render() {
    const { invitations, event, dispatch } = this.props;
    const filter = new RegExp(`\\b${invitations.get('filter')}`, 'i');
    const total = invitations.get('data').size;
    const confirmed = invitations.get('data')
      .filter(({ status }) => status === 'ATTENDED')
      .size;

    const list = total
      ? invitations.get('data')
          .filter(({ normalizedName }) => normalizedName.match(filter))
          .sort(({ normalizedName: a }, { normalizedName: b }) => (
            a.match(filter).index - b.match(filter).index
            || a < b ? -1 : 1
          ))
          .toArray()
      : [];

    declare var invitation;
    declare var idx;

    return (
      <div className="EventGuestList">
        <Header title={event && event.title} />
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
  event: PropTypes.object,
  invitations: PropTypes.arrayOf(PropTypes.object),
};

export default connect(({ invitations, events }, { router }) => ({
  invitations,
  event: events.get('data').filter(({ slug }) => slug === router.params.slug).toArray()[0],
}))(EventGuestList);
