import React, { PropTypes } from 'react';
import { reduce } from 'lodash';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const defaultClasses = 'Button mdl-button mdl-js-button';
const buildClasses = ({
  className,
  fab,
  raised,
  ripple,
  accent,
  success,
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
    'mdl-button--fab': fab,
    'Button--accent': accent,
    'Button--success': success,
    'Button--loading': loading,
    'Button--block': block,
    'Button--done': done,
  })
);

const buildDataProps = props => (
  reduce(props, (obj, value, key) => ({ ...obj, [`data-${key}`]: value }), {})
);

const Button = ({ id, onClick, avatar, label, icon, type, disabled, dataProps, ...props }) => (
  <button
    id={id}
    className={buildClasses(props)}
    type={type}
    onClick={onClick}
    disabled={disabled}
    {...buildDataProps(dataProps)}
  >
    <If condition={icon && !avatar}>
      <i className={`fa fa-${icon}`} />
    </If>
    <If condition={avatar}>
      <img alt="avatar" className="Button-avatar" src={avatar} />
    </If>
    {label}
  </button>
);

Button.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.any,
  icon: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  dataProps: PropTypes.object,
};

export default Button;
