import React from 'react';
import Header from './header';
import Features from './features';
import Contact from './contact';
import Footer from './footer';

require('./style.scss');

const Landing = () =>
  <div className="Landing">
    <Header />
    <Features />
    <Contact />
    <Footer />
  </div>;

export default Landing;
