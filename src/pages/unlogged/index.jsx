import React, { PropTypes } from 'react';
import TopBar from '~/src/components/top-bar';
import Snackbar from '~/src/components/snackbar';
import tracking from '~/src/toakee-core/apis/tracking';

require('./style.scss');

class Unlogged extends React.Component {
  render() {
    tracking.locale((locale) => {
      tracking.track('Unlogged Page View', {
        distinct_id: 'Unamed',
        path: location.pathname,
        $referring_domain: document.referrer,
        $city: locale.city,
        $region: locale.regionName,
        mp_country_code: locale.countryCode,
        ip: locale.query,
        $browser: tracking.navigator(),
      });
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
