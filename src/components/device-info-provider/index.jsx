import React from 'react';
import PropTypes from 'prop-types';
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

DeviceInfoProvider.childContextTypes = {
  deviceInfo: PropTypes.object,
};
