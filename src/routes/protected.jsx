import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';

const renderOrRedirect = (Component, componentProps, auth, redirectTo) => (
  auth()
    ? <Component {...componentProps} />
    : <Redirect to={{ pathname: redirectTo, state: { from: componentProps.location } }} />
);

const ProtectedRoute = ({ auth, redirectTo, component, ...rest }) => (
  <Route {...rest} render={props => renderOrRedirect(component, props, auth, redirectTo)} />
);

ProtectedRoute.propTypes = {
  auth: PropTypes.func,
  redirectTo: PropTypes.string,
  component: PropTypes.func,
};

export default ProtectedRoute;
