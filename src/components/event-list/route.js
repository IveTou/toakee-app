import Relay, { Route } from 'react-relay';

export default class EventListRoute extends Route {
  static routeName = 'EventListRoute';
  static paramDefinitions = {
    start: { required: true },
    end: { required: true },
  };
  static queries = {
    viewer: () => Relay.QL`
      query { viewer }
    `,
  };
}
