import React, { PropTypes } from 'react';
import TopBar from '~/src/components/top-bar';
import Snackbar from '~/src/components/snackbar';
import Footer from '~/src/components/footer';

require('./style.scss');

const Unlogged = ({ children }) => {
  const goTop = () => window.scrollTo(0, 0);

  return (
    <div className="Unlogged">
      <TopBar />
      <Snackbar />
      <main className="main">
        {children} {goTop()}
      </main>
      <Footer />
    </div>
  );
};

Unlogged.propTypes = {
  children: PropTypes.node,
};

Unlogged.defaultProps = {
  children: null,
};

export default Unlogged;
