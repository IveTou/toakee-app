import Relay, { Route } from 'react-relay';

export default class EventRoute extends Route {
  static routeName = 'EventRoute';
  static paramDefinitions = {
    slug: { required: true },
  };
  static queries = {
    viewer: () => Relay.QL`
      query { viewer }
    `,
  };
}
