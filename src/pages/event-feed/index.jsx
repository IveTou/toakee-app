import React from 'react';
import PropTypes from 'prop-types';

import EventBox from '~/src/components/event-box';
import Banner from '~/src/components/banner';

import { withIndexStyle } from './styles';

const EventFeed = ({ classes }) => (
  <div>
    <div className={classes.banner}>
      <Banner />
    </div>
    <div className={classes.list}>
      <EventBox />
    </div>
  </div>
);

EventFeed.propTypes = {
  classes: PropTypes.object,
};

export default withIndexStyle(EventFeed);
