import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { Input, Icon } from 'semantic-ui-react';

import { closeDashboard } from '~/src/toakee-core/ducks/dashboard';
import { changeInvitationsFilter } from '~/src/toakee-core/ducks/invitations';

import { generateGuestListPdf } from '~/src/utils/pdf';
import Header from '~/src/components/header';
import EventGuestListList from './list';

if (process.env.BROWSER) {
  require('./style.scss');
}

export const query = gql`
  query Invitations($eventSlug: String) {
    viewer {
      event(slug: $eventSlug) {
        id
        title
        slug

        invitations {
          id
          name
          normalizedName
          status

          guestList {
            name
          }
        }
      }
    }
  }
`;

class EventGuestList extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(closeDashboard());
  }

  render() {
    const { filter, dispatch, viewer } = this.props;
    const { event } = viewer || {};
    const { invitations } = event || {};

    const total = (invitations || []).length;
    const confirmed = (invitations || [])
      .filter(({ status }) => status === 'ATTENDED')
      .length;

    return (
      <div className="EventGuestList">
        <Header title={event && event.title} />
        <div className="EventGuestList-filters">
          <Input
            className="EventGuestList-filters-input"
            icon="search"
            placeholder="Digite o nome"
            onChange={e => dispatch(changeInvitationsFilter(e.target.value))}
          />
          <div className="EventGuestList-filters-summary">
            <span className="EventGuestList-filters-summary-total">
              <b>Nomes na lista:</b> {total}
            </span>
            <span className="EventGuestList-filters-summary-separator"> | </span>
            <span className="EventGuestList-filters-summary-confirmed">
              <b>Confirmados:</b> {confirmed}
            </span>
          </div>
          <div className="EventGuestList-filters-tools">
            <Icon
              className="EventGuestList-filters-tools-icon"
              onClick={() => generateGuestListPdf(event, invitations)}
              name="file pdf outline"
              size="big"
            />
          </div>
        </div>
        <EventGuestListList
          invitations={invitations}
          filter={filter}
          event={event}
        />
      </div>
    );
  }
}

EventGuestList.propTypes = {
  viewer: PropTypes.object,
  dispatch: PropTypes.func,
  filter: PropTypes.string,
};

const EventGuestListWithData = graphql(query, {
  options: ({ router }) => ({
    variables: {
      eventSlug: router.params.slug,
    },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
})(EventGuestList);

export default connect(({ invitations }) => ({
  filter: invitations.get('filter'),
}))(EventGuestListWithData);
