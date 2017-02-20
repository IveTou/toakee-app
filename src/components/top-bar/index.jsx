import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Button from 'react-toolbox/lib/button';
import { Link as RouterLink } from 'react-router';
import ToakeeIcon from '~/src/components/icon';
require('./style.scss');


const TopBar = () => (
  <AppBar title="Toakee" className="TopBar w3-text-purple  w3-hover-yellow w3-card-2" leftIcon={<ToakeeIcon/>}>
    <Navigation type="horizontal">
      <RouterLink to={{ pathname: '/login' }}>
        <Button className ="w3-right w3-hide-small" label="Login" flat />
      </RouterLink>
      <Button className ="w3-right w3-hide-large w3-hide-medium" label="V" flat />
    </Navigation>
  </AppBar>
);

export default TopBar;
