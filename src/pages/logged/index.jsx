import React, { PropTypes } from 'react';
//import { getToken } from '~/src/utils/session';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import TopBar from '~/src/components/top-bar';

require('./style.scss');

class Logged extends React.Component {
  
  componentWillMount() {
    //TrackingAPI.track('Logged Page View', 'pid');
  }

  render() {
    return (
      <div className="Logged mdl-layout mdl-layout--fixed-header mdl-js-layout">
        <TopBar />
        <main className="main mdl-layout__content">
          {this.props.children}
        </main>
      </div>
    );
  }
}

Logged.propTypes = {
  children: PropTypes.node,
};

Logged.defaultProps = {
  children: null,
};

export default Logged;
