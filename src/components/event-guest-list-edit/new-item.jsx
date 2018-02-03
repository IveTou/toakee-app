import React, { PropTypes } from 'react';
import moment from 'moment';
import autoBind from 'react-autobind';
import { Card, Divider, Form, Button } from 'semantic-ui-react';

import TimePicker from '~/src/components/time-picker';

const initialState = start => ({
  name: '',
  socialIntegration: '',
  registrationDeadline: moment(start).set({ hour: 20, minute: 0, second: 0 }),
  entranceDeadline: moment(start).set({ hour: 23, minute: 59, second: 0 }),
});

export default class EventGuestListEditNewItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    const { event: { start } } = this.props;
    this.state = initialState(start);
  }

  onChange(_, { name, value }) {
    this.setState({ [name]: value });
  }

  onSubmit() {
    const { registrationDeadline, entranceDeadline, name, socialIntegration } = this.state;

    if (name) {
      const { createGuestList, event: { id, start } } = this.props;

      createGuestList({
        eventId: id,
        name,
        registrationDeadline: registrationDeadline.toDate(),
        entranceDeadline: moment(start).isAfter(entranceDeadline)
          ? entranceDeadline.add(1, 'days').toDate()
          : entranceDeadline.toDate(),
        socialIntegrations: socialIntegration
          ? [{ network: 'INSTAGRAM', mediaUrl: socialIntegration }]
          : [],
      });

      this.setState(initialState(start));
    }
  }

  render() {
    const { registrationDeadline, entranceDeadline } = this.state;

    return (
      <Card className="EventGuestListEditNewItem">
        <Card.Content>
          <Card.Header>Nova lista</Card.Header>
          <Divider />
          <Form onSubmit={this.onSubmit}>
            <Form.Input
              onChange={this.onChange}
              placeholder="Ex.: VIP"
              label="Nome"
              name="name"
            />
            <Form.Input
              onChange={this.onChange}
              placeholder="https://www.instagram.com/p/00000000000/"
              label="Link da foto no instagram"
              name="socialIntegration"
            />
            <Form.Field inline>
              <label>Entrar na <u>lista</u> até:</label>
              <TimePicker
                time={registrationDeadline}
                onChange={value => this.setState({ registrationDeadline: value })}
                className="EventGuestListEditNewItem-input"
              />
            </Form.Field>
            <Form.Field inline>
              <label>Entrar na <u>festa</u> até:</label>
              <TimePicker
                time={entranceDeadline}
                onChange={value => this.setState({ entranceDeadline: value })}
                className="EventGuestListEditNewItem-input"
              />
            </Form.Field>
          </Form>
          <Divider />
          <Button content="Adicionar lista" onClick={this.onSubmit} color="green" fluid />
        </Card.Content>
      </Card>
    );
  }
}

EventGuestListEditNewItem.propTypes = {
  event: PropTypes.object,
  createGuestList: PropTypes.func,
};
