import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchViewer } from '~/src/toakee-core/ducks/viewer';

import TrackingAPI from '~/src/toakee-core/apis/tracking';
import TopBar from '~/src/components/top-bar';

require('./style.scss');

export class Logged extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchViewer());
  }

  componentWillReceiveProps({ viewer }) {
    if (viewer.size) {
      TrackingAPI.track('Logged Page View', viewer.id);
    }
  }

  render() {
    return (
      <div className="Logged mdl-layout mdl-layout--fixed-header mdl-js-layout">
        <TopBar viewer={this.props.viewer} />
        <main className="main mdl-layout__content">
          {this.props.children}
        </main>
      </div>
    );
  }
}

Logged.propTypes = {
  children: PropTypes.node,
  viewer: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  ({ viewer }) => ({ viewer: viewer.get('data') }),
)(Logged);
