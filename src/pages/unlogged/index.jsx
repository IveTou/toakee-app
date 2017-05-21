import React, { PropTypes } from 'react';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import TopBar from '~/src/components/top-bar';
import Snackbar from '~/src/components/snackbar';

require('./style.scss');

class Unlogged extends React.Component {

  componentWillMount() {
    TrackingAPI.track('Unlogged Page View', 'Guest');
  }

  render() {
    return (
      <div className="Unlogged mdl-layout mdl-layout--fixed-header mdl-js-layout">
        <TopBar />
        <Snackbar />
        <main className="main mdl-layout__content">
          {this.props.children}
        </main>
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
