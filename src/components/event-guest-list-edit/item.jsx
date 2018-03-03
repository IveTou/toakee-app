import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Map } from 'immutable';
import autoBind from 'react-autobind';
import { Form, Input, Divider, Button, Icon, TextArea, Card, Label } from 'semantic-ui-react';

import TimePicker from '~/src/components/time-picker';

import EventGuestListEditInvitationsList from './invitations-list';

const extractNames = newInvitations => (
  newInvitations
    .split('\n')
    .map(name => name.trim().replace(/\s+/g, ' '))
    .filter(name => name)
);

const mapGuestList = gl => ({
  id: gl.id,
  name: gl.name,
  entranceDeadline: moment(gl.entranceDeadline),
  registrationDeadline: moment(gl.registrationDeadline),
  socialIntegration: gl.socialIntegrations[0] ? gl.socialIntegrations[0].mediaUrl : '',
});

class EventGuestListEditItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    const { guestList } = this.props;

    this.state = {
      tempGuestList: Map(mapGuestList(guestList)),
      editingForm: Map({
        name: false,
        registrationDeadline: false,
        entranceDeadline: false,
        socialIntegration: false,
      }),
    };
  }

  onChange(attr, value) {
    this.setState({
      tempGuestList: this.state.tempGuestList.set(attr, value),
      editingForm: this.state.editingForm.set(attr, true),
    });
  }

  onChangeArea(e) {
    this.setState({ newInvitations: e.target.value });
  }

  addNamesToGuestList(e) {
    e.preventDefault();

    const { newInvitations } = this.state;
    this.props.addNamesToGuestList(this.props.guestList, extractNames(newInvitations))
      .catch(() => this.setState({ newInvitations }));

    this.setState({ newInvitations: '' });
  }

  saveChanges(attr) {
    const { tempGuestList, editingForm } = this.state;
    const patch = attr === 'socialIntegration'
      ? { socialIntegrations: [{ mediaUrl: tempGuestList.get(attr), network: 'INSTAGRAM' }] }
      : { [attr]: tempGuestList.get(attr) };
    const updater = (value, isEditing) => {
      this.setState({
        tempGuestList: tempGuestList.set(attr, value),
        editingForm: editingForm.set(attr, isEditing),
      });
    };

    this.props.updateGuestList(this.props.guestList, patch)
      .catch(() => updater(mapGuestList(this.props.guestList)[attr], true));

    updater(patch[attr], false);
  }

  cancelChanges(attr) {
    const value = mapGuestList(this.props.guestList)[attr];

    this.setState({
      tempGuestList: this.state.tempGuestList.set(attr, value),
      editingForm: this.state.editingForm.set(attr, false),
    });
  }

  removeGuestList() {
    this.props.removeGuestList(this.props.guestList.id);
  }

  renderEditingButtons(attr) {
    return this.state.editingForm.get(attr) && (
      <span className="EventGuestListEditItem-input-editingButtons">
        <Icon link name="check" onClick={() => this.saveChanges(attr)} />
        <Icon link name="delete" onClick={() => this.cancelChanges(attr)} />
      </span>
    );
  }

  render() {
    const { guestList, removeInvitation } = this.props;
    const { tempGuestList, editingForm } = this.state;

    const inputClasses = editingForm
      .map(v => `EventGuestListEditItem-input ${v ? 'editing' : ''}`);

    const socialIntegration = guestList.socialIntegrations.length
      ? guestList.socialIntegrations[0].mediaUrl
      : '';

    return (
      <Card className="EventGuestListEditItem">
        <Card.Content>
          <Label corner>
            <Icon link name="trash" onClick={this.removeGuestList} />
          </Label>
          <Card.Header color="orange">
            <Input
              transparent
              value={tempGuestList.get('name')}
              onChange={e => this.onChange('name', e.target.value)}
              className={inputClasses.get('name')}
            />
            {this.renderEditingButtons('name')}
          </Card.Header>

          <Divider />

          <Form>
            <Form.Field inline>
              <label>Entrar na <u>lista</u> até: </label>
              <TimePicker
                time={tempGuestList.get('registrationDeadline')}
                onChange={time => this.onChange('registrationDeadline', time)}
              />
              {this.renderEditingButtons('registrationDeadline')}
            </Form.Field>

            <Form.Field inline>
              <label>Entrar na <u>festa</u> até: </label>
              <TimePicker
                time={tempGuestList.get('entranceDeadline')}
                onChange={time => this.onChange('entranceDeadline', time)}
              />
              {this.renderEditingButtons('entranceDeadline')}
            </Form.Field>

            <Form.Field>
              <label>Link no instagram:</label>
              <Input
                placeholder="http://linkaqui"
                value={tempGuestList.get('socialIntegration')}
                onChange={(_, { value }) => this.onChange('socialIntegration', value)}
                transparent
              >
                <input />
                <If condition={socialIntegration && !editingForm.get('socialIntegration')}>
                  <a href={socialIntegration} target="_blank" rel="noopener noreferrer">
                    <Icon name="external" />
                  </a>
                </If>
                {this.renderEditingButtons('socialIntegration')}
              </Input>
            </Form.Field>
          </Form>

          <Divider />

          <Form>
            <TextArea
              onChange={this.onChangeArea}
              placeholder="Adicionar nomes. Um por linha."
              value={this.state.newInvitations}
              rows={2}
            />
            <Button icon="plus" onClick={this.addNamesToGuestList} color="green" basic />
          </Form>
          <EventGuestListEditInvitationsList
            invitationsList={guestList.invitations}
            removeInvitation={removeInvitation}
          />
        </Card.Content>
      </Card>
    );
  }
}

EventGuestListEditItem.propTypes = {
  guestList: PropTypes.object,
  addNamesToGuestList: PropTypes.func,
  updateGuestList: PropTypes.func,
  removeGuestList: PropTypes.func,
  removeInvitation: PropTypes.func,
};

export default EventGuestListEditItem;
