import React, { PropTypes } from 'react';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import TopBar from '~/src/components/top-bar';
import Snackbar from '~/src/components/snackbar';
import Footer from '~/src/components/footer';

require('./style.scss');

class Unlogged extends React.Component {

  componentWillMount() {
    TrackingAPI.track('Unlogged Page View', 'Guest');
  }

  render() {
    return (
      <div className="Unlogged">
        <TopBar />
        <Snackbar />
        <main className="main">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

Unlogged.propTypes = {
  children: PropTypes.node,
};

Unlogged.defaultProps = {
  children: null,
};

export default Unlogged;
