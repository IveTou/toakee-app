import React from 'react';
import { Popup } from 'semantic-ui-react';

const ErrorWrapper = ({ children, errors = [] }) => (
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

export default ErrorWrapper;
