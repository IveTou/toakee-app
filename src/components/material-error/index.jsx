import React, { PropTypes } from 'react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const MaterialError = ({ error, center }) => {
  const classes = classNames('MaterialError', {
    'MaterialError--center': center,
  });

  return error
    ? <div className={classes}>{error}</div>
    : null;
};

MaterialError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  center: PropTypes.bool,
};

export default MaterialError;
