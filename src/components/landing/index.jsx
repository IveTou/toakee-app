import React from 'react';
import moment from 'moment';

import EventList from '~/src/components/event-list';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Landing = () => (
  <div className="Landing">
    <div className="Landing-banner">
      <div className="Landing-banner-content">
        <div className="Landing-banner-content-title">A solução</div>
        <div className="Landing-banner-content-subtitle">para listas de eventos</div>
        <p className="Landing-banner-content-body">
          Você, promoter, publique seu evento e aproveite
          toda praticidade que oferecemos.
        </p>

        <p className="Landing-banner-content-body right">
          Você, baladeiro, faça aquele &quot;Vamos marcar...&quot; acontecer.
          Confira nossos eventos!
        </p>
      </div>

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

export default Landing;
