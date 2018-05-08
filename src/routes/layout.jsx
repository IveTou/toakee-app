import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import DefaultLayout from '~/src/layouts/default';

const LayoutRoute = ({
  layout: Layout = DefaultLayout,
  component: Component,
  render,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Choose>
          <When condition={Component}><Component {...props} /></When>
          <When condition={render}>{render(props)}</When>
        </Choose>
      </Layout>
    )}
  />
);

LayoutRoute.propTypes = {
  component: PropTypes.func,
  layout: PropTypes.func,
  render: PropTypes.func,
};

export default LayoutRoute;
