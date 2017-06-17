import React from 'react';
import autoBind from 'react-autobind';
import moment from 'moment';

import ToakeeAPI from '~/src/toakee-core/apis/toakee';

import { Container } from 'semantic-ui-react'

import Button from '~/src/components/button';
import BannerCarousel from '~/src/components/banner-carousel';
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
          <BannerCarousel/>

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
