import React, { PropTypes } from 'react';
import { Popup, Label } from 'semantic-ui-react';

const stopPropagation = e => {
  console.log({ e });
  e.stopPropagation();
};

const ErrorLabel = ({ error }) => !error ? null : (
  <Popup
    trigger={
      <Label
        onClick={stopPropagation}
        icon="warning sign"
        color="red"
        corner
      />
    }
    content={error}
    position="left center"
    hideOnScroll
  />
);

ErrorLabel.propTypes = {
  error: PropTypes.string,
};

export default ErrorLabel;
