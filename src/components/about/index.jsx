import React from 'react';
import moment from 'moment';
import { Grid, Header } from 'semantic-ui-react';

import EventList from '~/src/components/event-list';

if (process.env.BROWSER) {
  require('./style.scss');
}

const About = () => (
  <Grid className="About"columns={2} relaxed>
    <Grid.Column className="About-banner">
      <div className="About-banner-text">
        Nossa missão
        <br />
        é fazer com que
        <br />
        você descubra
        <h1>
          os melhores eventos
        </h1>
        da sua vida!
      </div>
    </Grid.Column>
    <Grid.Column className="About-description">
      <Header size="huge" color="orange">MAS... QUEM SOMOS?</Header>
      <Header as="h3" disabled>#DescubraEventosAnywhere</Header>
      <p>
        O Toakee é uma plataforma para você descobrir eventos,
        de qualquer tipo e onde quer que você esteja.
      </p>
      <Header as="h3" disabled>#CadastreSeuEvento #ÉGratuito</Header>
      <p>
        Além disso, é possível cadastrar seus próprios eventos tornando-os acessíveis
        para muitas pessoas. E sim, tudo isso gratuitamente!
      </p>
      <Header as="h3" disabled>#VivaMaisMomentos</Header>
      <p>
        Quem não fica feliz em descobrir que acontece aquela feira interessante na rua ao lado,
        saber que naquele restaurante a uma quadra da sua casa está com uma promoção e música ao
        vivo, ou encontrar a balada que vai tocar o seu DJ favorito?
      </p>
      <Header as="h3" disabled>#CompartilheSuaAlegria</Header>
      <p>
        Nós acreditamos que a vida é composta por eventos. Melhor ainda quando esses eventos são
        compartilhados. Por esse motivo, ajudamos as pessoas a combinarem eventos com seus amigos,
        e a explorar o que está acontecendo à sua volta.
      </p>
      <Header as="h3" color="orange">
        A propósito, ainda não sabe o que fazer hoje? Lá vão algumas sugestões!
      </Header>

      <EventList
        title="Sugestões"
        start={moment().startOf('day')}
        end={moment().endOf('day')}
      />
    </Grid.Column>
  </Grid>
);

export default About;
