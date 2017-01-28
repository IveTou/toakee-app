import React from 'react';
import Header from '~/src/components/header';
import Features from '~/src/components/features';
require('./style.scss');

const Landing = () => 
  <div className ="Landing">
    <Header/>
    <Features/>
  </div>;
export default Landing;
