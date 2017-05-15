import React, { PropTypes } from 'react';
import moment from 'moment';
import autoBind from 'react-autobind';

import { formRef } from '~/src/utils/form';
import { createGuestList } from '~/src/toakee-core/ducks/guest-lists';

import Button from '~/src/components/button';
import Input from '~/src/components/input';
import TimePicker from '~/src/components/time-picker';

export default class EventGuestListEditNewItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      registrationDeadline: moment().set({ hour: 20, minute: 0 }),
      entranceDeadline: moment().set({ hour: 23, minute: 59 }),
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch, event: { id, start } } = this.props;
    const { name, socialIntegration } = this.form;

    if (name.value) {
      const { registrationDeadline, entranceDeadline } = this.state;

      dispatch(createGuestList(id, {
        name: name.value,
        registrationDeadline: registrationDeadline.toDate(),
        entranceDeadline: moment(start).isAfter(entranceDeadline)
          ? entranceDeadline.add(1, 'days').toDate()
          : entranceDeadline.toDate(),
        socialIntegrations: socialIntegration.value
         ? [{ network: 'INSTAGRAM', mediaUrl: socialIntegration.value }]
         : [],
      }));
    }
  }

  render() {
    const { registrationDeadline, entranceDeadline } = this.state;

    return (
      <div className="EventGuestListEditNewItem mdl-card mdl-shadow--2dp">
        <form ref={formRef(this)}>
          <Input
            className="EventGuestListEditNewItem-input"
            placeholder="Ex.: VIP"
            label="Nome da lista"
            name="name"
          />
          <Input
            className="EventGuestListEditNewItem-input"
            placeholder="https://www.instagram.com/p/00000000000/"
            label="Link da foto no instagram"
            name="socialIntegration"
          />
          <TimePicker
            time={registrationDeadline}
            onChange={value => this.setState({ registrationDeadline: value })}
            className="EventGuestListEditNewItem-input"
            label={<span>Entrar na <b>lista</b> até</span>}
          />
          <TimePicker
            time={entranceDeadline}
            onChange={value => this.setState({ entranceDeadline: value })}
            className="EventGuestListEditNewItem-input"
            label={<span>Entrar na <b>festa</b> até</span>}
          />
          <Button
            label="Adicionar lista"
            success
            block
            onClick={this.onSubmit}
          />
        </form>
      </div>
    );
  }
}

EventGuestListEditNewItem.propTypes = {
  event: PropTypes.object,
  dispatch: PropTypes.func,
};
