import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import device from 'device';
import { compose, withContext } from 'recompose';

import query from './graphql';

const ContextProvider = ({ children }) => children;

ContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const injectViewer = graphql(query, {
  props: ({ data: { viewer } }) => ({ viewer }),
});

const injectContext = withContext(
  { viewer: PropTypes.object, deviceInfo: PropTypes.object },
  ({ viewer, userAgent }) => ({ viewer, deviceInfo: device(userAgent) }),
);

export default compose(
  injectViewer,
  injectContext,
)(ContextProvider);
