import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { get, xor } from 'lodash';
import classNames from 'classnames';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Paper, Toolbar, Checkbox, Typography, Button,
} from  'material-ui';
import { compose, withStateHandlers } from 'recompose';

import Spacer from '~/src/components/spacer';

import query, { confirmRSVP } from './graphql';
import { withIndexStyle } from './styles';

const PendingGuests = ({
  classes, selectedItems, onToggleAll, onToggleItem, onConfirmRSVP, pendingGuests = [],
}) => {
  declare var pendingGuest;

  const selectionAmount = selectedItems.length;
  const allSelected = pendingGuests.length === selectionAmount;

  return (
    <div className={classes.root}>
      <Paper>
        <Toolbar
          className={classNames(classes.toolbar, {
            [classes.toolbarSelected]: !!selectionAmount,
          })}
        >
          <Choose>
            <When condition={!!selectionAmount}>
              <Typography variant="title" color="textSecondary">
                {selectionAmount} Selecionado{selectionAmount > 1 ? 's' : ''}
              </Typography>
              <Spacer />
              <Button variant="raised" color="primary" onClick={() => onConfirmRSVP(selectedItems)}>
                Enviado
              </Button>
            </When>
            <Otherwise>
              <Typography variant="title">
                Nomes nas listas
              </Typography>
            </Otherwise>
          </Choose>
        </Toolbar>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={!!selectionAmount && !allSelected}
                  checked={allSelected}
                  onChange={onToggleAll}
                />
              </TableCell>
              <TableCell>Evento</TableCell>
              <TableCell>Convidado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each="pendingGuest" of={pendingGuests}>
              <TableRow
                hover
                key={pendingGuest.id}
                onClick={() => onToggleItem(pendingGuest.id)}
              >
                <TableCell>
                  <Checkbox checked={!!~selectedItems.indexOf(pendingGuest.id)} />
                </TableCell>
                <TableCell>{pendingGuest.event.title}</TableCell>
                <TableCell>{pendingGuest.name}</TableCell>
              </TableRow>
            </For>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

PendingGuests.propTypes = {
  selectedItems: PropTypes.array,
  pendingGuests: PropTypes.array,
  onToggleAll: PropTypes.func,
  onToggleItem: PropTypes.func,
  onConfirmRSVP: PropTypes.func,
  classes: PropTypes.object,
};

const injectState = withStateHandlers(
  { selectedItems: [] },
  {
    onClearSelection: () => () => ({ selectedItems: [] }),
    onToggleItem: ({ selectedItems }) => itemId => ({
      selectedItems: xor(selectedItems, [itemId])
    }),
    onToggleAll: (_, { pendingGuests }) => (e) => ({
      selectedItems: e.target.checked ? pendingGuests.map(pg => pg.id) : [],
    }),
  },
);

const injectData = graphql(query, {
  props: ({ data }) => ({ pendingGuests: get(data, 'viewer.pendingGuests', []) }),
});

const injectConfirmRSVP = graphql(confirmRSVP, {
  options: { refetchQueries: ['PendingGuests'] },
  props: ({ mutate, ownProps: { onClearSelection } }) => ({
    onConfirmRSVP: ids => mutate({ variables: { ids } }).then(onClearSelection),
  }),
});

export default compose(
  injectData,
  injectState,
  injectConfirmRSVP,
  withIndexStyle,
)(PendingGuests);
