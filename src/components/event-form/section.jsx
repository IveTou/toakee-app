import React, { PropTypes } from 'react';
import { Paper } from 'material-ui';

const EventFormSection = ({ Section, title, form }) => (
  <div className="EventFormSection">
    <h3 className="EventFormSection-title">{title}</h3>
    <Paper className="EventFormSection-content">
      <Section form={form} />
    </Paper>
  </div>
);

EventFormSection.propTypes = {
  Section: PropTypes.element,
  title: PropTypes.string,
  form: PropTypes.object,
};

export default EventFormSection;
