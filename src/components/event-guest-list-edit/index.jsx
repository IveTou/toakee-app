import React, { PropTypes } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Card } from 'semantic-ui-react';

import { dialogConfirm } from '~/src/ducks/dialog';
import {
  closeDashboard,
  toggleDashboard as _toggleDashboard,
} from '~/src/ducks/dashboard';

import Header from '~/src/components/header';
import EventGuestListEditNewItem from './new-item';
import EventGuestListEditItem from './item';

import query, {
  createGuestListMutation,
  updateGuestListMutation,
  removeGuestListMutation,
  addNamesToGuestListMutation,
  removeInvitationMutation,
} from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

class EventGuestListEdit extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.closeDashboard();
  }

  render() {
    const {
      viewer = {},
      toggleDashboard,
      createGuestList,
      updateGuestList,
      confirmRemove,
      removeGuestList,
      addNamesToGuestList,
      removeInvitation,
    } = this.props;

    const { event = {} } = viewer;
    const { guestLists = [] } = event;
    declare var guestList;

    return (
      <div className="EventGuestListEdit">
        <Header title="Gerenciar listas" onIconClick={toggleDashboard} />
        <Card.Group className="EventGuestListEdit-lists">
          <If condition={event.start}>
            <EventGuestListEditNewItem
              createGuestList={createGuestList}
              event={event}
            />
          </If>
          <For each="guestList" of={guestLists}>
            <EventGuestListEditItem
              key={guestList.id}
              updateGuestList={updateGuestList}
              addNamesToGuestList={addNamesToGuestList}
              removeGuestList={confirmRemove(removeGuestList)}
              removeInvitation={confirmRemove(removeInvitation)}
              guestList={guestList}
              {...guestList}
            />
          </For>
        </Card.Group>
      </div>
    );
  }
}

EventGuestListEdit.propTypes = {
  viewer: PropTypes.object,
  confirmRemove: PropTypes.func,
  addNamesToGuestList: PropTypes.func,
  toggleDashboard: PropTypes.func,
  closeDashboard: PropTypes.func,
  updateGuestList: PropTypes.func,
  createGuestList: PropTypes.func,
  removeGuestList: PropTypes.func,
  removeInvitation: PropTypes.func,
};

const injectQuery = graphql(query, {
  options: ({ match }) => ({
    variables: { eventId: match.params.id },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
});

const injectCreateGuestList = graphql(createGuestListMutation, {
  props: ({ mutate, ownProps: { viewer } }) => ({
    createGuestList: (guestList) => {
      const { id: eventId } = viewer.event;

      return mutate({
        variables: guestList,
        update: (store, { data: { createGuestList: newGuestList } }) => {
          const data = store.readQuery({ query, variables: { eventId } });
          const guestLists = data.viewer.event.guestLists
            .filter(gl => gl.name !== guestList.name);

          data.viewer.event.guestLists = newGuestList.id
            ? [...guestLists, newGuestList]
            : guestLists;

          store.writeQuery({ query, data });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createGuestList: {
            ...guestList,
            id: guestList.name,
            registrationDeadline: guestList.registrationDeadline.toISOString(),
            entranceDeadline: guestList.entranceDeadline.toISOString(),
            limit: 0,
            privacy: 0,
            invitations: [],
            __typename: 'GuestList',
          },
        },
      });
    },
  }),
});

const injectRemoveGuestList = graphql(removeGuestListMutation, {
  props: ({ mutate, ownProps: { viewer } }) => ({
    removeGuestList: guestListId => () => {
      const { id: eventId } = viewer.event;

      return mutate({
        variables: { eventId, guestListId },
        update: (store) => {
          const data = store.readQuery({ query, variables: { eventId } });
          data.viewer.event.guestLists = data.viewer.event.guestLists
            .filter(gl => gl.id !== guestListId);
          store.writeQuery({ query, data });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeGuestList: true,
        },
      });
    },
  }),
});

const injectAddNamesToGuestList = graphql(addNamesToGuestListMutation, {
  props: ({ mutate, ownProps: { viewer } }) => ({
    addNamesToGuestList: (_guestList, names) => {
      const { id: guestListId, eventId } = _guestList;

      return mutate({
        variables: { eventId, guestListId, names },
        update: (store, { data: { addNamesToGuestList: newInvitations } }) => {
          const data = store.readQuery({ query, variables: { eventId } });
          const guestList = data.viewer.event.guestLists.find(gl => gl.id === guestListId);

          guestList.invitations = guestList.invitations
            .filter(i => names.indexOf(i.name) === -1)
            .concat(newInvitations || []);

          store.writeQuery({ query, data });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addNamesToGuestList: names.map(name => ({
            id: guestListId + name,
            name,
            eventId,
            guestListId,
            __typename: 'Invitation',
          })),
        },
      });
    },
  }),
});

const injectUpdateGuestList = graphql(updateGuestListMutation, {
  props: ({ mutate, ownProps: { viewer } }) => ({
    updateGuestList: (guestList, patch) => {
      const { id: guestListId, eventId } = guestList;

      return mutate({
        variables: { eventId, guestListId, patch },
        update: (store, { data: { updateGuestList } }) => {
          const data = store.readQuery({ query, variables: { eventId } });
          const updatedGuestList = updateGuestList
            ? Object.assign({}, guestList, patch)
            : guestList;

          const { event } = data.viewer;
          event.guestLists = event.guestLists
            .map(gl => (gl.id === guestListId ? updatedGuestList : gl));

          store.writeQuery({ query, data });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateGuestList: true,
        },
      });
    },
  }),
});

const injectRemoveInvitation = graphql(removeInvitationMutation, {
  props: ({ mutate, ownProps: { viewer } }) => ({
    removeInvitation: invitation => () => {
      const { id: invitationId, guestListId, eventId } = invitation;

      return mutate({
        variables: { eventId, invitationId },
        update: (store, { data: { removeInvitation } }) => {
          const data = store.readQuery({ query, variables: { eventId } });
          const guestList = data.viewer.event.guestLists.find(gl => gl.id === guestListId);
          guestList.invitations = guestList.invitations.filter(i => i.id !== invitationId);

          if (!removeInvitation) {
            guestList.invitations.push(invitation);
          }

          store.writeQuery({ query, data });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeInvitation: true,
        },
      });
    },
  }),
});

const EventGuestListEditWithData = compose(
  injectQuery,
  injectCreateGuestList,
  injectUpdateGuestList,
  injectRemoveGuestList,
  injectAddNamesToGuestList,
  injectRemoveInvitation,
)(EventGuestListEdit);

export default connect(
  () => ({}),
  dispatch => ({
    toggleDashboard: () => dispatch(_toggleDashboard()),
    closeDashboard: () => dispatch(closeDashboard()),
    confirmRemove: remover => (...args) => {
      const title = 'Tem certeza que deseja remover?';
      const confirmTrigger = { color: 'red', icon: 'trash' };

      dispatch(dialogConfirm(title, remover(...args), { confirmTrigger }));
    },
  }),
)(EventGuestListEditWithData);
