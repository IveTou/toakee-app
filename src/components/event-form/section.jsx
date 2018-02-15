import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  Typography, Icon,
} from 'material-ui';

import { withSectionStyle } from './styles';

const EventFormSection = ({ classes, onToggle, expanded, Section, title, form }) => (
  <ExpansionPanel
    classes={{ expanded: classes.rootExpanded }}
    CollapseProps={{ className: classes.collapse }}
    expanded={expanded}
    onChange={onToggle}
  >
    <ExpansionPanelSummary
      classes={{ expanded: classes.summaryExpanded }}
      expandIcon={<Icon>expand_more</Icon>}
    >
      <Typography variant="subheading">{title}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={classes.details}>
      <Section form={form} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

EventFormSection.propTypes = {
  Section: PropTypes.func,
  classes: PropTypes.object,
  onToggle: PropTypes.func,
  title: PropTypes.string,
  form: PropTypes.object,
  expanded: PropTypes.bool,
};

export default withSectionStyle(EventFormSection);
