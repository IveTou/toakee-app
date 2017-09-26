import React, { PropTypes } from 'react';

export const withViewer = (Component) => {
  const ComponentWithViewer = (props, { viewer }) => <Component viewer={viewer} {...props} />;
  ComponentWithViewer.contextTypes = { viewer: PropTypes.object };
  return ComponentWithViewer;
};
