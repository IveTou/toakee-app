import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { Button, Dropdown } from 'semantic-ui-react';
import { withAuth } from '~/src/components/auth-modal/hoc';

import query, { registerAttendance, unregisterAttendance } from './graphql';

const AttendButton = ({ attendance, toggle, discountLists = [] }) => (
  <Button.Group color="green" basic={!attendance} size="small">
    <Choose>
      <When condition={discountLists.length && !attendance}>
        <Dropdown text='Vou' button icon="checkmark" className="icon">
          <Dropdown.Menu>
            <Dropdown.Header content='Selecione uma lista de desconto' />
            <For each="discountList" of={discountLists}>
              <Dropdown.Item onClick={() => toggle(discountList.id)}>
                {discountList.name}
              </Dropdown.Item>
            </For>
            <Dropdown.Item onClick={toggle}>Não colocar nome em lista</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </When>
      <Otherwise>
        <Button
          icon="checkmark"
          onClick={toggle}
          basic={!attendance}
          content="Vou"
        />
      </Otherwise>
    </Choose>
  </Button.Group>
);

AttendButton.propTypes = {
  attendance: PropTypes.object,
  toggle: PropTypes.func,
};

const injectData = graphql(query, {
  options: ({ eventId }) => ({ variables: { eventId } }),
  props: ({ data: { attendance, discountLists } }) => ({ attendance, discountLists }),
});

const options = { refetchQueries: ['Attendance'] };

const injectRegisterAttendance = graphql(registerAttendance, {
  options,
  props: ({ mutate, ownProps: { attendance, eventId, requireLogin } }) => ({
    [attendance ? '_' : 'toggle']: (
      requireLogin((_, discountListId) => mutate({ variables: { eventId, discountListId } }))
    )
  }),
});

const injectUnregisterAttendance = graphql(unregisterAttendance, {
  options,
  props: ({ mutate, ownProps: { attendance, eventId } }) => ({
    [attendance ? 'toggle' : '_']: () => mutate({ variables: { eventId } }),
  }),
});


export default compose(
  withAuth,
  injectData,
  injectRegisterAttendance,
  injectUnregisterAttendance,
)(AttendButton);
