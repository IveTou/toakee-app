import React, { PropTypes } from 'react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const defaultClasses = 'TextArea';
const buildClasses = ({ className }) => (
  classNames(defaultClasses, className)
);

const TextArea = ({ label, name, ...props }) => (
  <div className={buildClasses(props)}>
    <label htmlFor={`area-${label}`}>{label}</label>
    <textarea id={`area-${label}`} name={name} />
  </div>
);

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default TextArea;
