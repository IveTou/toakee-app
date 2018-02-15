import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

const Arrow = ({ className, onClick, direction }) => (
  <Button
    circular
    className={className}
    icon={`chevron ${direction}`}
    onClick={onClick}
  />
);

Arrow.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.string,
  onClick: PropTypes.func,
};

export default Arrow;
