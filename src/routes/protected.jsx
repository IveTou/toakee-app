import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { withViewer } from '~/src/hocs';

const renderOrRedirect = (Component, componentProps, shouldRender, redirectTo) => (
  <Choose>
    <When condition={shouldRender}>
      <Component {...componentProps} />
    </When>
    <Otherwise>
      <Redirect to={{ pathname: redirectTo, state: { from: componentProps.location } }} />
    </Otherwise>
  </Choose>
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
