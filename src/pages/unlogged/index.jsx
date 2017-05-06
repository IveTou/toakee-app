import React, { PropTypes } from 'react';
import TopBar from '~/src/components/top-bar';
import Snackbar from '~/src/components/snackbar';
import Tracking from '~/src/toakee-core/apis/tracking';

require('./style.scss');

class Unlogged extends React.Component {
  render() {
    /*Tracking.register({
      "user_id": "user",
    });*/
    Tracking.track('Unlogged Page View', {
      "path": "path",
      "refer": "refer",
    });
    return (
      <div className="Unlogged mdl-layout mdl-layout--fixed-header mdl-js-layout">
        <TopBar />
        <Snackbar />
        <main className="main mdl-layout__content">
          { this.props.children }
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
