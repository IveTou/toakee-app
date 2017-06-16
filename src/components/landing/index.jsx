import React from 'react';
import autoBind from 'react-autobind';
import moment from 'moment';

import ToakeeAPI from '~/src/toakee-core/apis/toakee';

import Button from '~/src/components/button';

import EventList from '~/src/components/event-list';

if (process.env.BROWSER) {
  require('./style.scss');
  require('smoothit');
}

const EmailStatus = {
  DEFAULT: 0,
  SENDING: 1,
  SENT: 2,
};

const EmailReasons = {
  doubt: 'Dúvida',
  suggestion: 'Sugestão',
  criticism: 'Crítica',
};

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      emailStatus: EmailStatus.DEFAULT,
    };
  }

  submit(e) {
    e.preventDefault();
    const { name, email, reason, body } = this.form;
    const subject = `${EmailReasons[reason.value]} de ${email.value}`;

    if (name.value && email.value && body) {
      this.setState({ emailStatus: EmailStatus.SENDING });
      ToakeeAPI
        .sendEmail(name.value, email.value, subject, body.value)
        .then(() => {
          name.value = '';
          email.value = '';
          body.value = '';
          this.setState({ emailStatus: EmailStatus.SENT });
        });
    }
  }

  renderSubmitButton() {
    const { DEFAULT, SENDING, SENT } = EmailStatus;
    const { emailStatus } = this.state;

    const label = {
      [DEFAULT]: 'Enviar Email',
      [SENDING]: 'Enviando',
      [SENT]: 'Enviado!',
    }[emailStatus];

    const props = {
      accent: true,
      raised: true,
      ripple: true,
      block: true,
      done: emailStatus === SENT,
      loading: emailStatus === SENDING,
      disabled: emailStatus !== DEFAULT,
    };

    return <Button label={label} type="submit" {...props} />;
  }

  render() {
    return (
      <div className="Landing">
        <div className="Landing-banner">
          <Container>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
    pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt.
    Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius
    laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
          </Container>

          <div className="Landing-banner-list">
            <EventList
              title="Próximos Eventos"
              start={moment().startOf('day')}
              end={moment().endOf('day')}
            />
          </div>
        </div>
        <div className="Landing-lists">
          <EventList
            title="Nesta semana"
            start={moment().add(1, 'days').startOf('day')}
            end={moment().endOf('isoWeek')}
          />
          <EventList
            title="Eventos futuros"
            start={moment().add(1, 'week').startOf('isoWeek')}
          />
        </div>
      </div>
    );
  }
}
