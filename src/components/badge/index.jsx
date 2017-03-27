import React, { PropTypes } from 'react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const defaultClasses = 'Badge';
const buildClasses = ({
  className,
}) => (
  classNames(defaultClasses, className)
);

const Badge = ({ label, ...props }) => (
  <span className={buildClasses(props)}>
    {label}
  </span>
);

Badge.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Badge;
