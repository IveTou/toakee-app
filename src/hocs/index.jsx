import React, { PropTypes } from 'react';
import { pick } from 'lodash';

export const withViewer = (Component) => {
  const ComponentWithViewer = (props, { viewer }) => <Component viewer={viewer} {...props} />;
  ComponentWithViewer.contextTypes = { viewer: PropTypes.object };
  return ComponentWithViewer;
};

const availableInfo = {
  viewer: PropTypes.object,
  deviceInfo: PropTypes.object,
};

export const withInfo = (Component, info) => {
  const ComponentWithInfo = (props, contextProps) => <Component {...contextProps} {...props} />;
  ComponentWithInfo.contextTypes = pick(availableInfo, info);
  return ComponentWithInfo;
};
