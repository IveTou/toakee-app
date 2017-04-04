import React, { PropTypes } from 'react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const defaultClasses = 'TextArea';
const buildClasses = ({ className }) => (
  classNames(defaultClasses, className)
);

const TextArea = ({ label, name, placeholder, rows, ...props }) => (
  <div className={buildClasses(props)}>
    <If condition={label}>
      <label htmlFor={`area-${label}`}>{label}</label>
    </If>
    <textarea
      id={label && `area-${label}`}
      name={name}
      rows={rows}
      placeholder={placeholder}
    />
  </div>
);

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default TextArea;
