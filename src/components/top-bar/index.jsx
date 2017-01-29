import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Button from 'react-toolbox/lib/button';
import { Link as RouterLink } from 'react-router';
import ToakeeIcon from '~/src/components/icon';
require('./style.scss');


const TopBar = () => (
  <AppBar title="Toakee" className="TopBar w3-top  w3-card-2" leftIcon={<ToakeeIcon/>}>
    <Navigation type="horizontal">
    {/*
      <RouterLink to={{ pathname: '/login' }}>
        <Button className ="w3-right w3-hide-small" label="Login" flat />
      </RouterLink>
      <Button className ="w3-right w3-hide-large w3-hide-medium" label="V" flat />
      */}
    </Navigation>
    
  </AppBar>
);
/*

const TopBar = () => (
  <div className="w3-top">
    <ul className="TopBar w3-navbar w3-white w3-card-2" >
      <li>
        <a  className="w3-wide"><b>To</b>aki  <i className="fa fa-envelope"/></a>
      </li>
    </ul>
  </div>
);
*/

export default TopBar;
