import React, { PropTypes } from 'react';
import TopBar from '~/src/components/top-bar';
import Snackbar from '~/src/components/snackbar';
import tracking from '~/src/toakee-core/apis/tracking';
import { navigatorName } from '~/src/utils/navigator';

require('./style.scss');

class Unlogged extends React.Component {

  componentWillMount() {
    tracking.track('Unlogged Page View', {
      distinct_id: 'Unamed',
      path: location.pathname,
      $browser: navigatorName(),
      $referring_domain: document.referrer,
    });
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
