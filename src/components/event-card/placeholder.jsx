import React from 'react';
import { Card, Dimmer, Image, Loader } from 'semantic-ui-react';

const EventCardPlaceholder = () => (
  <div className="EventCardPlaceholder">
    <Dimmer inverted active><Loader content="Carregando" /></Dimmer>
    <Card>
      <Image className="EventCardPlaceholder-background" />
      <Card.Content>
        <Card.Header>Lorem ipsum</Card.Header>
        <Card.Meta>Dolor sit amet</Card.Meta>
      </Card.Content>
      <Card.Content className="EventCardPlaceholder-details" extra>
        <div className="EventCardPlaceholder-details-calendar">
          <div className="EventCardPlaceholder-details-calendar-month">Lor</div>
          <div className="EventCardPlaceholder-details-calendar-day">0</div>
        </div>
        <div className="EventCardPlaceholder-details-timeAndPlace" />
      </Card.Content>
    </Card>
  </div>
);

export default EventCardPlaceholder;
