import React, { PropTypes } from 'react';
import { Popup } from 'semantic-ui-react';

const ErrorWrapper = ({ children, errors = [] }) => {
  declare var error;

  return (
    <Choose>
      <When condition={errors.length}>
        <Popup
          trigger={children}
          content={<For each="error" of={errors}><div key={error}>{error}</div></For>}
          position="top center"
          hideOnScroll
        />
      </When>
      <Otherwise>{children}</Otherwise>
    </Choose>
  );
};

ErrorWrapper.propTypes = {
  children: PropTypes.node,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default ErrorWrapper;
