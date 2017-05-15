import React, { PropTypes } from 'react';

const DashboardContent = ({ content, selectedEvent }) => (
  <div className="DashboardContent">
    {React.Children.map(content, c => React.cloneElement(c, { selectedEvent }))}
  </div>
);

DashboardContent.propTypes = {
  content: PropTypes.any,
  selectedEvent: PropTypes.object,
};

export default DashboardContent;
