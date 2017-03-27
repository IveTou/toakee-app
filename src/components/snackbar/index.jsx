import React from 'react';

if (process.env.BROWSER) {
  require('./style.scss');
}

export const showToast = (message, options) => {
  document.querySelector('.Snackbar').MaterialSnackbar.showSnackbar({
    message,
    ...options,
  });
};

const Snackbar = () => (
  <div className="Snackbar mdl-js-snackbar mdl-snackbar">
    <div className="mdl-snackbar__text" />
    <button className="mdl-snackbar__action" type="button" />
  </div>
);

export default Snackbar;
