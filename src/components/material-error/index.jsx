import React, { PropTypes } from 'react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const MaterialError = ({ error, center }) => {
  const classes = classNames('MaterialError', {
    'MaterialError--center': center,
  });

  return (
    <If condition={!!error}>
      <div className={classes}>{error}</div>
    </If>
  );
};

MaterialError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  center: PropTypes.bool,
};

export default MaterialError;
