import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideState, injectState, softUpdate } from 'freactal';
import { merge } from 'lodash';

import { addNamesToGuestList } from '~/src/toakee-core/ducks/invitations';

import TimePicker from '~/src/components/time-picker';
import Button from '~/src/components/button';
import Icon from '~/src/components/icon';

const buildInputClass = (state, input) => (
  `EventGuestListEditItem-input ${state.editingForm[input] ? 'editing' : ''}`
);

declare var invitation;
declare var idx;

const stateWrapper = provideState({
  initialState: ({ id, name, entranceDeadline, registrationDeadline, socialIntegrations }) => ({
    id,
    name,
    editingForm: {},
    entranceDeadline,
    registrationDeadline,
    socialIntegration: socialIntegrations[0] ? socialIntegrations[0].mediaUrl : '',
    newInvitations: '',
  }),
  effects: {
    onChange: softUpdate((state, attr, value) => ({
      [attr]: value,
      editingForm: { ...state.editingForm, [attr]: true },
    })),
    cancelChanges: (effects, attr, oldValue, id) => (state) => {
      if (attr === 'name') {
        const input =
          document.querySelector(`.EventGuestListEditItem.id-${id} input`);
        input.value = oldValue;
      } else if (attr === 'socialIntegration') {
        const input =
          document.querySelector(
            `.EventGuestListEditItem.id-${id} .socialIntegrations input`,
          );
        input.value = oldValue;
      }

      return merge({}, state, {
        [attr]: oldValue,
        editingForm: { ...state.editingForm, [attr]: false },
      });
    },
    saveChanges: (effects, guestList, attr, _state) => {
      const patch = attr === 'socialIntegration'
        ? { socialIntegrations: { mediaUrl: [_state[attr]] } }
        : { [attr]: _state[attr] };

      return effects.updateGuestList(guestList.eventId, guestList.id, patch)
        .then(() => state => (
          merge({}, state, { editingForm: { ...state.editingForm, [attr]: false } })
        ));
    },
  },
});

export const EventGuestListEditItem = ({
  id,
  eventId,
  name,
  entranceDeadline,
  registrationDeadline,
  socialIntegrations,
  invitationsList,
  state,
  effects,
  submitNewInvitations,
}) => {
  const guestList = { id, eventId };
  const socialIntegration = socialIntegrations.length
    ? socialIntegrations[0].mediaUrl
    : '';

  const renderEditingButtons = (attr, oldValue) => (
    <span className="EventGuestListEditItem-input-editingButtons">
      <Icon icon="check" onClick={() => effects.saveChanges(guestList, attr, state)} />
      <Icon icon="times" onClick={() => effects.cancelChanges(attr, oldValue, id)} />
    </span>
  );

  return (
    <div className={`EventGuestListEditItem mdl-card mdl-shadow--2dp id-${id}`}>
      <div className={`EventGuestListEditItem-name ${buildInputClass(state, 'name')}`}>
        <input
          defaultValue={state.name}
          onChange={e => effects.onChange('name', e.target.value)}
        />
        {renderEditingButtons('name', name)}
      </div>
      <div className={buildInputClass(state, 'registrationDeadline')}>
        <span>Entrar na <b>lista</b> até: </span>
        <span className="EventGuestListEditItem-input-field">
          <TimePicker
            className="EventGuestListEditItem-input"
            onChange={time => effects.onChange('registrationDeadline', time)}
            time={state.registrationDeadline}
          />
        </span>
        {renderEditingButtons('registrationDeadline', registrationDeadline)}
      </div>
      <div className={buildInputClass(state, 'entranceDeadline')}>
        <span>Entrar na <b>festa</b> até: </span>
        <span className="EventGuestListEditItem-input-field">
          <TimePicker
            className="EventGuestListEditItem-input"
            onChange={time => effects.onChange('entranceDeadline', time)}
            time={state.entranceDeadline}
          />
        </span>
        {renderEditingButtons('entranceDeadline', entranceDeadline)}
      </div>
      <div className="EventGuestListEditItem-input socialIntegrations">
        Link no instagram:
        <div
          className={
            `EventGuestListEditItem-socialIntegrations-item ${buildInputClass(state, 'socialIntegration')}`
          }
        >
          <input
            placeholder="http://linkaqui"
            defaultValue={state.socialIntegration}
            onChange={e => effects.onChange('socialIntegration', e.target.value)}
          />
          {renderEditingButtons('socialIntegration', socialIntegration)}
          <If condition={socialIntegration}>
            <a
              href={socialIntegration.mediaUrl}
            >
              <Icon icon="external-link" />
            </a>
          </If>
        </div>
      </div>
      <hr />
      <div className="EventGuestListEditItem-input addNames">
        <textarea
          placeholder="Adicionar nomes. Separe por quebra de linha."
          onChange={e => effects.onChange('newInvitations', e.target.value)}
        />
        <Button
          icon="plus"
          onClick={submitNewInvitations(guestList, state, effects)}
          success
        />
      </div>
      <div className="EventGuestListEditItem-invitations">
        <For each="invitation" index="idx" of={invitationsList}>
          <div key={idx} className="EventGuestListEditItem-invitations-item">
            {invitation.name}
          </div>
        </For>
      </div>
    </div>
  );
};

EventGuestListEditItem.propTypes = {
  id: PropTypes.string,
  eventId: PropTypes.string,
  name: PropTypes.string,
  entranceDeadline: PropTypes.object,
  registrationDeadline: PropTypes.object,
  socialIntegrations: PropTypes.array,
  invitationsList: PropTypes.object,
  state: PropTypes.object,
  effects: PropTypes.object,
  submitNewInvitations: PropTypes.func,
};

export default connect(
  ({ invitations, newInvitations }, { id }) => ({
    invitationsList: invitations
      .get('data')
      .filter(i => i.guestListId === id)
      .sortBy(i => i.name)
      .toList(),
  }),
  dispatch => ({
    submitNewInvitations: (guestList, { newInvitations }, effects) => () => {
      const { eventId, id } = guestList;

      const names = newInvitations
        .split('\n')
        .map(name => name.trim().replace(/\s+/g, ' '))
        .filter(name => name);

      const textarea = document.querySelector(
        `.EventGuestListEditItem.id-${id} textarea`,
      );
      textarea.value = '';

      effects.onChange('newInvitations', '');
      dispatch(addNamesToGuestList(eventId, id, names));
    },
  }),
)(stateWrapper(injectState(EventGuestListEditItem)));
