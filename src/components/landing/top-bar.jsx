import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import ToakeeIcon from './icon';

const TopBar = () => (
  <AppBar title="Toakee" className="TopBar w3-top  w3-card-2" leftIcon={<ToakeeIcon />} />
);

export default TopBar;
