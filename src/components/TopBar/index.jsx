import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Button from 'react-toolbox/lib/button';
import { Link as RouterLink } from 'react-router';

const TopBar = () => (
  <AppBar title="Toakee" className="TopBar">
    <Navigation type="horizontal">
      <RouterLink to={{ pathname: '/login' }}>
        <Button label="Login" flat accent />
      </RouterLink>
    </Navigation>
  </AppBar>
);

export default TopBar;
