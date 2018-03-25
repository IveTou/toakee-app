import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const defaultClasses = 'Input';
const buildClasses = ({ className }) => (
  classNames(defaultClasses, className)
);

const Input = ({
  type = 'text',
  name,
  label,
  placeholder,
  value,
  children,
  required,
  checked,
  ...props
}) => (
  <div className={buildClasses(props)}>
    <If condition={label}>
      <label htmlFor={`input-${label}`}>{label}</label>
    </If>
    <input
      id={`input-${label}`}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      defaultChecked={checked}
      required={required}
    />
    {children}
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.node,
};

export default Input;
