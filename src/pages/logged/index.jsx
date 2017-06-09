import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { fetchViewer } from '~/src/toakee-core/ducks/viewer';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import TopBar from '~/src/components/top-bar';

require('./style.scss');

export class Logged extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchViewer());
    const { viewer } = this.props;

    if (viewer.get('data').size) {
      //TrackingAPI.track('Logged Page View', viewer.get('data').get('id'));
      //Here is the problem: I'd need a callback function to track only after fetchView function is finished. In another way I could to put in render function, but you've told me this is a bad idea.
    }
  }

  componentWillReceiveProps({ viewer }) {
    if (viewer.id && !this.props.viewer.id) {
        console.log('testing');
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
