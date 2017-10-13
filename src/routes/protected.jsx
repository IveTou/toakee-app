import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withViewer } from '~/src/hocs';

const renderOrRedirect = (Component, componentProps, shouldRender, redirectTo) => (
  shouldRender
    ? <Component {...componentProps} />
    : <Redirect to={{ pathname: redirectTo, state: { from: componentProps.location } }} />
);

const ProtectedRoute = ({ auth, redirectTo, component, viewer = {}, ...rest }) => (
  <Route
    {...rest}
    render={props => renderOrRedirect(component, props, auth(viewer), redirectTo)}
  />
);

ProtectedRoute.propTypes = {
  auth: PropTypes.func,
  redirectTo: PropTypes.string,
  component: PropTypes.func,
  viewer: PropTypes.object,
};

export default withViewer(ProtectedRoute);
