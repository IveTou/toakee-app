import React, { PropTypes } from 'react';
import device from 'device';

export default class DeviceInfoProvider extends React.Component {
  getChildContext() {
    return { deviceInfo: device(this.props.userAgent) };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

DeviceInfoProvider.propTypes = {
  userAgent: PropTypes.string.isRequired,
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

DeviceInfoProvider.childContextTypes = {
  deviceInfo: PropTypes.object,
};
