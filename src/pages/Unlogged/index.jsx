import React from 'react';
import TopBar from '~/src/components/TopBar';

const Unlogged = ({ children }) => (
  <div className="Unlogged">
    <TopBar />
    {children}
  </div>
);

export default Unlogged;
