import React, { PropTypes } from 'react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const defaultClasses = 'Button mdl-button mdl-js-button';
const buildClasses = ({
  className,
  raised,
  ripple,
  accent,
  colored,
  done,
  loading,
  block,
}) => (
  classNames(defaultClasses, className, {
    'mdl-button--raised': raised,
    'mdl-js-ripple-effect': ripple,
    'mdl-button--accent': accent,
    'mdl-button--colored': colored,
    'Button--accent': accent,
    'Button--loading': loading,
    'Button--block': block,
    'Button--done': done,
  })
);

const Button = ({ onClick, label, icon, type, disabled, ...props }) => (
  <button
    className={buildClasses(props)}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    <If condition={icon}>
      <i className={`fa fa-${icon}`} />
    </If>
    {label}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
