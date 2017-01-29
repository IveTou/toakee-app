import React from 'react';
import Header from '~/src/components/header';
import Features from '~/src/components/features';
import Contact from '~/src/components/contact';
import Footer from '~/src/components/footer';

require('./style.scss');

const Landing = () =>
  <div className="Landing">
    <Header />
    <Features />
    <Contact />
    <Footer />
  </div>;

export default Landing;
