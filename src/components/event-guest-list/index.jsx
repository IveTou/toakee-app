import React, { PropTypes } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { Input, Icon } from 'semantic-ui-react';
import { flatMap } from 'lodash';

import { changeInvitationsFilter } from '~/src/ducks/invitations';
import {
  closeDashboard,
  toggleDashboard as _toggleDashboard,
} from '~/src/ducks/dashboard';
import { generateGuestListPdf } from '~/src/utils/pdf';
import { mapGuestListToInvitations } from '~/src/utils/mappers';
import Header from '~/src/components/header';

import EventGuestListList from './list';
import query, { setAttendanceStatusMutation } from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

class EventGuestList extends React.Component {
  componentWillMount() {
    this.props.closeDashboard();
  }

  render() {
    const { filter, viewer, toggleAttendanceStatus, toggleDashboard, changeFilter } = this.props;
    const { event } = viewer || {};
    const { guestLists = [] } = event || {};
    const invitations = flatMap(guestLists, mapGuestListToInvitations);

    const total = (invitations || []).length;
    const confirmed = (invitations || [])
      .filter(({ status }) => status === 'ATTENDED')
      .length;

    return (
      <div className="EventGuestList">
        <Header title={event && event.title} onIconClick={toggleDashboard} />
        <div className="EventGuestList-filters">
          <Input
            className="EventGuestList-filters-input"
            icon="search"
            placeholder="Digite o nome"
            onChange={changeFilter}
          />
          <div className="EventGuestList-filters-summary">
            <span className="EventGuestList-filters-summary-total">
              <b>Nomes na lista:</b> {total}
            </span>
            <span className="EventGuestList-filters-summary-separator"> | </span>
            <span className="EventGuestList-filters-summary-confirmed">
              <b>Confirmados:</b> {confirmed}
            </span>
          </div>
          <div className="EventGuestList-filters-tools">
            <Icon
              className="EventGuestList-filters-tools-icon"
              onClick={() => generateGuestListPdf(event, invitations)}
              name="file pdf outline"
              size="big"
            />
          </div>
        </div>
        <EventGuestListList
          toggleAttendanceStatus={toggleAttendanceStatus}
          invitations={invitations}
          filter={filter}
        />
      </div>
    );
  }
}

EventGuestList.propTypes = {
  viewer: PropTypes.object,
  filter: PropTypes.string,
  toggleAttendanceStatus: PropTypes.func,
  toggleDashboard: PropTypes.func,
  closeDashboard: PropTypes.func,
  changeFilter: PropTypes.func,
};

const injectData = graphql(query, {
  options: ({ match }) => ({
    variables: {
      eventId: match.params.id,
    },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
});

const injectSetAttendanceStatusMutation = graphql(setAttendanceStatusMutation, {
  props: ({ mutate, ownProps: { viewer } }) => ({
    toggleAttendanceStatus: (invitation) => {
      const { id: eventId } = viewer.event;

      const { status } = invitation;
      const newStatus = status === 'ATTENDED' ? 'INVITED' : 'ATTENDED';

      return mutate({
        variables: { eventId, status: newStatus, invitationId: invitation.id },
        update: (store, { data: { setAttendanceStatus } }) => {
          const data = store.readQuery({ query, variables: { eventId } });

          data.viewer.event.guestLists
            .find(({ id }) => id === invitation.guestList.id)
            .invitations
            .find(({ id }) => id === invitation.id)
            .status = setAttendanceStatus ? newStatus : status;

          store.writeQuery({ query, data });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          setAttendanceStatus: true,
        },
      });
    },
  }),
});

const EventGuestListWithData = compose(
  injectData,
  injectSetAttendanceStatusMutation,
)(EventGuestList);

export default connect(
  ({ invitations }) => ({ filter: invitations.get('filter') }),
  dispatch => ({
    toggleDashboard: () => dispatch(_toggleDashboard()),
    closeDashboard: () => dispatch(closeDashboard()),
    changeFilter: e => dispatch(changeInvitationsFilter(e.target.value)),
  }),
)(EventGuestListWithData);
