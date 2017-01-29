import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Button from 'react-toolbox/lib/button';
import ToakeeIcon from '~/src/components/icon';

require('./style.scss');

const TopBar = () => (
  <AppBar title="Toakee" className="TopBar w3-top  w3-card-2" leftIcon={<ToakeeIcon/>}>
    <Navigation type="horizonta"/>
  </AppBar>
);

export default TopBar;
