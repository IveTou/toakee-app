import React from 'react';
import { Card, CircularProgress } from 'material-ui';
import { deepOrange500 } from 'material-ui/styles/colors';

const EventCardPlaceholder = () => (
  <div className="EventCardPlaceholder">
    <Card>
        <CircularProgress
          className="EventCardPlaceholder-progress"
          size={60}
          color={deepOrange500}
        />
        <div>Carregando</div>
    </Card>
  </div>
);

export default EventCardPlaceholder;
