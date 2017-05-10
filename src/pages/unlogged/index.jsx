import React, { PropTypes } from 'react';
import TopBar from '~/src/components/top-bar';
import Snackbar from '~/src/components/snackbar';
import tracking from '~/src/toakee-core/apis/tracking';
import utils from '~/src/toakee-core/apis/utils';

require('./style.scss');

class Unlogged extends React.Component {

  componentWillMount() {
    utils.locale((locale) => {
      tracking.track('Unlogged Page View', {
        distinct_id: 'Unamed',
        path: location.pathname,
        ip: locale.query,
        mp_country_code: locale.countryCode,
        $browser: utils.navigator(),
        $referring_domain: document.referrer,
        $city: locale.city,
        $region: locale.regionName,
      });
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
