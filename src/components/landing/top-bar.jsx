import React from 'react';
import ToakeeIcon from './icon';

const TopBar = () => (
  <div className="TopBar w3-top">
    <div className="w3-navbar  w3-left-align w3-xlarge">
      <li>
        <a className="w3-hover-none">
          Toakee
          <ToakeeIcon />
        </a>
      </li>
    </div>
  </div>
);

export default TopBar;
